using Microsoft.AspNetCore.Mvc;
using MarkaSkor.Dtos;
using MarkaSkor.Entities;
using MarkaSkor.Models;
using Microsoft.EntityFrameworkCore;

using System.IdentityModel.Tokens.Jwt;
using BC = BCrypt.Net.BCrypt;
using MarkaSkor.Services;

namespace MarkaSkor.Controllers;

[ApiController]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly MarkaSkorContext _db;
    private readonly IUtilityService _utils;
    private readonly IJwtService _jwtUtils;

    public AuthController(ILogger<AuthController> logger, MarkaSkorContext db, IUtilityService utils, IJwtService jwtUtils)
    {
        _logger = logger;
        _db = db; // DbContext
        _utils = utils; // Utility methods
        _jwtUtils = jwtUtils; // JWT utility methods
    }



    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
    {
        try
        {
            // Validate input
            if (userDto == null)
            {
                return BadRequest("Invalid input data.");
            }

            // Check if the username or email is already registered
            if (await _db.Users.AnyAsync(u => u.username == userDto.username || (u.email == userDto.email && u.email_valid == true)))
            {
                return Conflict("Username is already registered.");
            }

            // Create new user
            // Note: HashPassword() handles both hashing and salting
            var newUser = new User
            {
                username = userDto.username,
                email = userDto.email,
                password = BC.HashPassword(userDto.password),
                fullname = userDto.fullname,
                email_valid = false,
                oauthId = null,
                oauthProvider = "none"
            };

            // Add the new user to the database
            await _db.Users.AddAsync(newUser);
            await _db.SaveChangesAsync();

            // Creating verification code in database and sending a link to the email
            // This link will have id and verification code as query strings and it will verify the email
            await CreateAndSendVerificationCodeAsync(newUser.id);

            // Login
            UserClaims userClaims = new()
            {
                id = newUser.id,
                username = newUser.username,
                email = newUser.email,
                fullname = newUser.fullname
            };
            var JWT = _jwtUtils.GenerateJWT(userClaims);
            return Ok(new { message = "Registration is successful", token = JWT });
        }
        catch (Exception ex)
        {
            // Log the exception
            _logger.LogError(ex, "An error occurred during registration");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    private async Task CreateAndSendVerificationCodeAsync(int userId)
    {
        // Create a random verification code
        string newVerificationCode = _utils.GenerateRandom(64, "code");

        // Create a verification entry
        var newVerificationEntry = new UserVerification
        {
            userId = userId,
            verficationCode = newVerificationCode,
            creationDate = DateTime.UtcNow,
            expirationDate = DateTime.UtcNow.AddMonths(1)
        };

        // Add the new verification entry to the database
        await _db.UserVerifications.AddAsync(newVerificationEntry);
        await _db.SaveChangesAsync();

        // Send the verification code via email to the user
        await SendVerificationEmailAsync(userId, newVerificationCode);
    }

    private async Task SendVerificationEmailAsync(int userId, string verificationCode)
    {
        /*var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Your App", "yourapp@example.com")); // Set your app's name and email here
        message.To.Add(new MailboxAddress("User", "user@example.com")); // Replace with the user's email address
        message.Subject = "Verification Code";

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.TextBody = $"Your verification code is: {verificationCode}";

        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.example.com", 587, false); // Replace with your SMTP server and port
        await client.AuthenticateAsync("your_username", "your_password"); // Replace with your SMTP credentials
        await client.SendAsync(message);
        await client.DisconnectAsync(true);*/
    }



    // https://localhost:7165/api/email-verification?userid={userId}&code={code}
    // Phone number verification
    [HttpGet("email-verification")]
    public async Task<IActionResult> EmailVerification([FromQuery] string userid, [FromQuery] string code)
    {
        try
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(userid) || string.IsNullOrWhiteSpace(code))
            {
                return BadRequest("Invalid input data");
            }

            // Find verification record
            if (!await _db.UserVerifications.AnyAsync(a =>
                a.userId == Convert.ToInt32(userid) &&
                a.verficationCode == code && a.expirationDate > DateTime.UtcNow))
            {
                return BadRequest("Invalid verification code or expired.");
            }

            // Get user by id
            var user = await _db.Users.FirstOrDefaultAsync(u => u.id == Convert.ToInt32(userid));
            if (user == null)
            {
                return NotFound("User not found.");
            }
            else if (!user.email_valid)
            {
                // Verify email
                user.email_valid = true;
                await _db.SaveChangesAsync();
                return Ok("Email successfully verified.");
            }
            else
            {
                return Accepted("Email is already verified.");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during email verification.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }



    [HttpPost("oauth-auth")]
    public async Task<IActionResult> OauthAuthentication([FromBody] OauthCredential oauth)
    {
        try
        {
            // Validate input
            if (oauth == null || string.IsNullOrWhiteSpace(oauth.credential))
            {
                return BadRequest("Invalid input data.");
            }

            // Decode the JWT credential
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(oauth.credential);
            var claims = token.Claims;

            // Get the required data from claims
            string sub = claims.FirstOrDefault(c => c.Type == "sub")!.Value; // ID
            string email = claims.FirstOrDefault(c => c.Type == "email")!.Value;
            string iss = claims.FirstOrDefault(c => c.Type == "iss")!.Value; // Provider
            string? fullname = claims.FirstOrDefault(c => c.Type == "name")?.Value;
            string? firstName = claims.FirstOrDefault(c => c.Type == "given_name")?.Value;
            string? lastName = claims.FirstOrDefault(c => c.Type == "family_name")?.Value;

            // Initialization of userClaims
            UserClaims userClaims = new();

            if (await _db.Users.AnyAsync(u => u.oauthId == sub && u.oauthProvider == iss))
            {
                // If the user is registered

                var getUser = await _db.Users.Where(u => u.oauthId == sub && u.oauthProvider == iss).Select(u => new { u.id, u.username, u.email, u.fullname }).FirstOrDefaultAsync();
                userClaims = new()
                {
                    id = getUser!.id,
                    username = getUser.username,
                    email = getUser.email,
                    fullname = getUser.fullname
                };
            }
            else if (await _db.Users.AnyAsync(u => u.email == email && u.email_valid == true && u.oauthProvider == "none"))
            {
                // If a user already has a verified account - Associate it with this

                // Get verified account that doesn't have oauth
                var verifiedWithoutOauth = await _db.Users.FirstOrDefaultAsync(u =>
                    u.email == email &&
                    u.email_valid == true &&
                    u.oauthProvider == "none");
                verifiedWithoutOauth!.oauthId = sub;
                verifiedWithoutOauth!.oauthProvider = iss;
                await _db.SaveChangesAsync();

                userClaims = new()
                {
                    id = verifiedWithoutOauth.id,
                    username = verifiedWithoutOauth.username,
                    email = verifiedWithoutOauth.email,
                    fullname = verifiedWithoutOauth.fullname
                };
            }
            else if (await _db.Users.AnyAsync(u => u.email == email && u.email_valid == true && u.oauthProvider != iss))
            {
                // If a user already has a verified account with other oauth options like Facebook
                // It's important that previous if condition should have (oauthProvider == "none")

                return Conflict("User has already registered with other oauth services using this email address");
            }
            else
            {
                // If user is non-existent, register it

                // Create the first part of username
                string newUsername = (firstName ?? "") + (lastName ?? "");
                if (newUsername == "")
                    newUsername = "user";

                // Creating unique username because user will not
                // Set the max amount of tries before giving up
                int maxTries = 5;
                for (int tries = 1; tries <= maxTries; tries++)
                {
                    // Try giving less extra numbers to username at first, gradually increase
                    int randomLength = 4;
                    if (tries == 3) randomLength = 7;
                    else if (tries > 3) randomLength = 10;

                    Console.WriteLine("Random length: " + randomLength);

                    // Create test username with random numbers and check database
                    string userNameTest = newUsername + _utils.GenerateRandom(randomLength, "number");

                    if (!await _db.Users.AnyAsync(u => u.username == userNameTest))
                    {
                        // We have a proper username that doesn't already exist now
                        newUsername = userNameTest;
                        break;
                    }
                    else if (tries == maxTries)
                    {
                        // Too many tries for a new unique username
                        return StatusCode(StatusCodes.Status508LoopDetected);
                    }
                }

                // Create new user
                var newUser = new User
                {
                    username = newUsername,
                    email = email,
                    password = null, // Pw not required for oauth
                    fullname = fullname, // Nullable
                    email_valid = true, // true by default with oauth
                    oauthId = sub,
                    oauthProvider = iss
                };

                // Add the new user to the database
                await _db.Users.AddAsync(newUser);
                await _db.SaveChangesAsync();

                userClaims = new()
                {
                    id = newUser.id,
                    username = newUser.username,
                    email = newUser.email,
                    fullname = fullname
                };
            }

            // Login
            var JWT = _jwtUtils.GenerateJWT(userClaims);
            return Ok(new { message = "Login is successful", token = JWT });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during oauth authentication.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }



    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto userDto)
    {
        try
        {
            // Validate input
            if (userDto == null || string.IsNullOrWhiteSpace(userDto.userIdentifier) || string.IsNullOrWhiteSpace(userDto.password))
            {
                return BadRequest("Invalid input data.");
            }

            // Get user id if the user exists
            // userIdentifier can be username or email, it will check if it's username first
            var checkUser = await _db.Users.AsNoTracking().Where(u =>
                    u.username == userDto.userIdentifier ||
                    (u.email == userDto.userIdentifier && u.email_valid))
                .Select(u => new { u.id, u.password, u.username, u.email, u.fullname })
                .FirstOrDefaultAsync();

            // Give error if user doesn't exist or passwords don't match
            if (checkUser == null || !BC.Verify(userDto.password, checkUser.password))
            {
                return NotFound("User not found");
            }

            // Login
            UserClaims userClaims = new()
            {
                id = checkUser.id,
                username = checkUser.username,
                email = checkUser.email,
                fullname = checkUser.fullname
            };
            var JWT = _jwtUtils.GenerateJWT(userClaims);
            return Ok(new { message = "Login is successful", token = JWT });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during login.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }







    // CAN BE USED FOR "SEND VERIFICATION EMAIL AGAIN" IN ACCOUNT SETTINGS
    // Reject if there are more than 3 waiting verification codes
    // This could be upgraded to rejecting more than 3 per day by using creationDate property
    /*var existingVerificationCodes = _db.UserVerifications.Count(a =>
        a.userId == userDto.email &&
        a.expirationDate > DateTime.UtcNow);
    if (existingVerificationCodes >= 3)
    {
        return StatusCode(StatusCodes.Status429TooManyRequests, "Too many verification code requests.");
    }*/



    // CAN BE USED IF WE ADD MORE INFO TO JWT PAYLOAD
    /*UserClaims claims = new()
    {
        id = Convert.ToInt32()
    };*/




    // CAN BE USED FOR TESTING GOOGLE CLAIMS
    // Get the list of claims in a presentable format and send to front end for testing
    /*List<ClaimKeyVal> claimArray = new();
    foreach (var claim in claims)
    {
        claimArray.Add(new ClaimKeyVal
        {
            Type = claim.Type,
            Value = claim.Value
        });
    }
    return Ok(new { claimArray });*/



    // UNNECESSARY
    // BC.HashPassword(_utils.GenerateRandom(16, "code")); // Generate random pw - Not needed if login checks oauthProvider == "none"



    // DEPRECATED FOR LIFE - Because expired codes won't verify
    // Delete expired verification codes
    // Expired codes never verify, this is for cleaning the database table
    /*var expiredVerificationCodes = await _db.UserVerifications.Where(a =>
        a.email == userDto.email &&
        a.expirationDate < DateTime.UtcNow).ToListAsync();
    foreach (var verification in expiredVerificationCodes)
    {
        _db.UserVerifications.Remove(verification);
    }
    if (expiredVerificationCodes.Count > 0)
        await _db.SaveChangesAsync();*/


    /* DEPRECATED - PHONE VERIFICATION


    //Sending SMS for registration
    [HttpPost("deprecated-pre-register")]
    public async Task<IActionResult> DeprecatedPreRegister([FromBody] PreRegisterUserDto userDto)
    {
        // Check if the username, phone number or email is already registered
        if (await _db.Users.AnyAsync(u => u.username == userDto.username || u.phoneNumber == userDto.phoneNumber || (userDto.email != null && u.email == userDto.email && u.email_valid == true)))
        {
            return Conflict();
        }

        // Reject if there are more than 3 waiting activation codes
        var existingActivationCodes = _db.UserActivations.Count(a =>
            a.phoneNumber == userDto.phoneNumber &&
            a.expirationDate > DateTime.UtcNow);
        if (existingActivationCodes >= 3)
        {
            return StatusCode(StatusCodes.Status429TooManyRequests);
        }

        // Delete expired activation codes
        var expiredActivationCodes = await _db.UserActivations.Where(a =>
            a.phoneNumber == userDto.phoneNumber &&
            a.expirationDate < DateTime.UtcNow).ToListAsync();
        foreach (var activationCode in expiredActivationCodes)
        {
            _db.UserActivations.Remove(activationCode);
        }
        if (expiredActivationCodes.Count > 0)
            await _db.SaveChangesAsync();

        // Create activation code and associate it with phone number in UserActivation table
        string newCode = new Random().Next(1000, 10000).ToString();
        var newCodeEntry = new UserActivation
        {
            phoneNumber = userDto.phoneNumber,
            activationCode = newCode,
            creationDate = DateTime.UtcNow,
            expirationDate = DateTime.UtcNow.AddMinutes(2)
        };
        await _db.UserActivations.AddAsync(newCodeEntry);
        await _db.SaveChangesAsync();

        return Ok(new { message = $"Activation code sent: {newCode}" }); // Message will be replaced obviously
    }

    //Phone number verification
    [HttpPost("deprecated-register")]
    public async Task<IActionResult> DeprecatedRegister([FromBody] RegisterUserDto userDto)
    {
        // Check if the username, phone number or email is already registered
        if (await _db.Users.AnyAsync(u => u.username == userDto.username || u.phoneNumber == userDto.phoneNumber || (userDto.email != null && u.email == userDto.email && u.email_valid == true)))
        {
            return Conflict();
        }

        // Check if the sent activation code matches with the one user entered
        // Also checks if it's before expiration date
        var checkCode = await _db.UserActivations.FirstOrDefaultAsync(a =>
            a.phoneNumber == userDto.phoneNumber &&
            a.activationCode == userDto.activationCode &&
            a.expirationDate > DateTime.UtcNow);
        if (checkCode == null)
        {
            return BadRequest();
        }

        // Create new user
        var newUser = new User
        {
            phoneNumber = userDto.phoneNumber,
            username = userDto.username,
            email = userDto.email,
            password = userDto.password,
            fullname = userDto.fullname,
            phoneNumber_valid = true
        };

        // Add the new user to the database
        _db.Users.Add(newUser);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Registration successful." });
    }
    */



}
