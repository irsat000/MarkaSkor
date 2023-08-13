using System;

namespace MarkaSkor.Dtos;



public class RegisterUserDto
{
    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string email { get; set; } = null!;

    public string? fullname { get; set; }
}
