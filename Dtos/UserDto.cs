

namespace MarkaSkor.Dtos;



public class RegisterUserDto
{
    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string email { get; set; } = null!;

    public string? fullname { get; set; }
}

public class LoginUserDto
{
    public string? username { get; set; }

    public string? email { get; set; }

    public string password { get; set; } = null!;
}