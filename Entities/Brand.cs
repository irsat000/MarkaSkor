using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Brand
{
    public int id { get; set; }

    public string brandName { get; set; } = null!;

    public string? logo { get; set; }

    public string? icon { get; set; }

    public string? brandDesc { get; set; }

    public virtual ICollection<BrandReview> BrandReviews { get; } = new List<BrandReview>();

    public virtual ICollection<Brand__Category> Brand__Categories { get; } = new List<Brand__Category>();
}
