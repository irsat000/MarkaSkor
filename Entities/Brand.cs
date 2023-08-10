using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Brand
{
    public int id { get; set; }

    public string brandKey { get; set; } = null!;

    public string brandName { get; set; } = null!;

    public string? logo { get; set; }

    public string? icon { get; set; }

    public virtual ICollection<Brand__Category> Brand__Categories { get; } = new List<Brand__Category>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();
}
