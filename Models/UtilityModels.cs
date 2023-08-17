

namespace MarkaSkor.Models;

public class ClaimKeyVal
{
    public string Type { get; set; } = null!;
    public string Value { get; set; } = null!;
}

public class UserClaims
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public string? email { get; set; }
    public string? fullname { get; set; }
}