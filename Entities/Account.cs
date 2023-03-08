using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Account
{
    public int id { get; set; }

    public string? externalId { get; set; }

    public string externalType { get; set; } = null!;

    public string username { get; set; } = null!;

    public string pw { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool emailValid { get; set; }

    public virtual ICollection<BrandReview> BrandReviews { get; } = new List<BrandReview>();
}
