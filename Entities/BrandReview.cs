using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class BrandReview
{
    public int id { get; set; }

    public string? comment { get; set; }

    public byte stars { get; set; }

    public int brandId { get; set; }

    public int accountId { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Brand brand { get; set; } = null!;
}
