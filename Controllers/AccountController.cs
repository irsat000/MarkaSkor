using Microsoft.AspNetCore.Mvc;

namespace MarkaSkor.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;

    public AccountController(ILogger<AccountController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] string asdf)
    {

        return Ok();
    }
}