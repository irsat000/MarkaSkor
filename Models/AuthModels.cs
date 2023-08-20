
namespace MarkaSkor.Models;

public class OauthCredential
{
    public string credential { get; set; } = null!;
}

public class UserClaims
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public string? email { get; set; }
    public string? fullname { get; set; }
}