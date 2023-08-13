using Microsoft.AspNetCore.Mvc;
using MarkaSkor.Dtos;
using MarkaSkor.Entities;
using Microsoft.EntityFrameworkCore;

using BC = BCrypt.Net.BCrypt;

namespace MarkaSkor.Controllers;

[ApiController]
[Route("api")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly MarkaSkorContext _db;

    public AccountController(ILogger<AccountController> logger, MarkaSkorContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public IActionResult Get()
    {
        // Implement your logic here
        return Ok(new { message = "Hello from .NET API" });
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

            return Ok(new { message = $"Registration successful. UserId: {newUser.id}" });
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
        // Encrypt a verification code
        string newVerificationCode = BC.HashPassword(userId + "--" + new Random().Next(12312, 123123).ToString());

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










    //Phone number verification
    [HttpGet("email-verification")]
    public async Task<IActionResult> EmailVerification([FromQuery] string userid, [FromQuery] string code)
    {
        try
        {
            // Validate input
            if (string.IsNullOrEmpty(userid) || string.IsNullOrEmpty(code))
            {
                return BadRequest("User ID and verification code are required.");
            }

            // Find verification record
            var verificationRecord = await _db.UserVerifications
                .FirstOrDefaultAsync(a => a.userId == Convert.ToInt32(userid) && a.verficationCode == code && a.expirationDate > DateTime.UtcNow);
            if (verificationRecord == null)
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


















    // DEPRECATED - Because full registration doesn't need verification anymore
    // Reject if there are more than 3 waiting verification codes
    /*var existingVerificationCodes = _db.UserVerifications.Count(a =>
        a.userId == userDto.email &&
        a.expirationDate > DateTime.UtcNow);
    if (existingVerificationCodes >= 3)
    {
        return StatusCode(StatusCodes.Status429TooManyRequests, "Too many verification code requests.");
    }*/

    // DEPRECATED - Because expired codes won't verify
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