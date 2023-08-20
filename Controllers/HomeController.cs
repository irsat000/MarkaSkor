using Microsoft.AspNetCore.Mvc;
using MarkaSkor.Dtos;
using MarkaSkor.Entities;
using MarkaSkor.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace MarkaSkor.Controllers;

[ApiController]
[Route("api")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    //end points


    // Example for Authorize - Tested with postman
    [Authorize]
    [HttpGet("rate-brand")]
    public IActionResult RateBrand()
    {
        var userEmailClaim = User.FindFirst(ClaimTypes.Email)!.Value;

        return Ok(new { message = "Success!", value = userEmailClaim });
    }
}
