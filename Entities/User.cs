using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class User
{
    public int id { get; set; }

    public string username { get; set; } = null!;

    public string? password { get; set; }

    public string? email { get; set; }

    public bool email_valid { get; set; }

    public string? fullname { get; set; }

    public string? oauthId { get; set; }

    public string oauthProvider { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();

    public virtual ICollection<UserVerification> UserVerifications { get; } = new List<UserVerification>();
}
