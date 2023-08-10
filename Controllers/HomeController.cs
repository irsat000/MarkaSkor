using Microsoft.AspNetCore.Mvc;

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
}
