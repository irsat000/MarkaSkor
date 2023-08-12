using System;

namespace MarkaSkor.Dtos;



public class PreRegisterUserDto
{
    public string phoneNumber { get; set; } = null!;

    public string username { get; set; } = null!;

    public string? email { get; set; }
}


public class RegisterUserDto
{
    public string phoneNumber { get; set; } = null!;

    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string? email { get; set; }

    public string? fullname { get; set; }

    public string activationCode { get; set; } = null!;
}
