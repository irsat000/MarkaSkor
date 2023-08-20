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
    public string GenerateJWT(UserClaims user);
}

public class JwtService : IJwtService
{
    private readonly ILogger<JwtService> _logger;
    private readonly IConfiguration _config;
    public JwtService(ILogger<JwtService> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public string GenerateJWT(UserClaims user)
    {
        if (string.IsNullOrWhiteSpace(_config["MyContext:JwtSecret"]))
        {
            _logger.LogError("JWT secret key is missing or empty");
            throw new ApplicationException("JWT secret key is missing or empty");
        }

        // Get Jwt secret
        string jwtSecret = _config["MyContext:JwtSecret"]!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)); //Encoding.ASCII.GetBytes();

        // Create claims
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.id.ToString()), // User Id
            new Claim(ClaimTypes.Name, user.username) // Username
        };
        if (!string.IsNullOrEmpty(user.email))
            claims.Add(new Claim(ClaimTypes.Email, user.email)); // Email
        if (!string.IsNullOrEmpty(user.fullname))
            claims.Add(new Claim("full_name", user.fullname)); // Fullname (custom claim type)

        // Token creation
        JwtSecurityTokenHandler tokenHandler = new();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(10),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
            Issuer = "MarkaSkorApi",
            Audience = "MarkaSkor"
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
