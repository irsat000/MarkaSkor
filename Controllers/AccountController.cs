using Microsoft.AspNetCore.Mvc;
using MarkaSkor.Dtos;
using MarkaSkor.Entities;
using Microsoft.EntityFrameworkCore;

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

    //Sending SMS for registration
    [HttpPost("pre-register")]
    public async Task<IActionResult> PreRegister([FromBody] PreRegisterUserDto userDto)
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
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
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
}