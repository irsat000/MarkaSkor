using Microsoft.AspNetCore.Mvc;
using MarkaSkor.Dtos;

namespace MarkaSkor.Controllers;

[ApiController]
[Route("api")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;

    public AccountController(ILogger<AccountController> logger)
    {
        _logger = logger;
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
        var responseData = new
        {
            Message = "Registration successful",
            UserId = "asdf"
        };

        return Ok(responseData);
    }
}