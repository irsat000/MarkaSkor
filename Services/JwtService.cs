using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MarkaSkor.Models;
using Microsoft.IdentityModel.Tokens;


namespace MarkaSkor.Services;

public interface IJwtService
{
    /// <summary>
    /// Generates a JWT for user authentication.
    /// </summary>
    /// <param name="user">User information.</param>
    /// <returns>A JWT string or null.</returns>
    public string? GenerateJWT(UserClaims user);
}

public class JwtService : IJwtService
{
    private readonly ILogger<JwtService> _logger;
    private readonly IConfiguration _config;
    public JwtService(ILogger<JwtService> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;

        if (string.IsNullOrWhiteSpace(_config["MyContext:JwtSecret"]))
        {
            _logger.LogError("JWT Secret not found");
        }
    }

    public string? GenerateJWT(UserClaims user)
    {
        if(string.IsNullOrWhiteSpace(_config["MyContext:JwtSecret"])){
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_config["MyContext:JwtSecret"]!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()) // User's ID
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
