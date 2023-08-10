using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class User
{
    public int id { get; set; }

    public string phone_number { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool email_valid { get; set; }

    public string password { get; set; } = null!;

    public string? username { get; set; }

    public bool is_active { get; set; }

    public DateTime? deactivation_date { get; set; }

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();
}
