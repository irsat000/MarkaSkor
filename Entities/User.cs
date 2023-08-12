using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class User
{
    public int id { get; set; }

    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string? phoneNumber { get; set; }

    public bool phoneNumber_valid { get; set; }

    public string? email { get; set; }

    public bool email_valid { get; set; }

    public string? fullname { get; set; }

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();
}
