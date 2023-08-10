using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Category
{
    public int id { get; set; }

    public string cateKey { get; set; } = null!;

    public string cateName { get; set; } = null!;

    public string icon { get; set; } = null!;

    public int sectorId { get; set; }

    public virtual ICollection<Brand__Category> Brand__Categories { get; } = new List<Brand__Category>();

    public virtual Sector sector { get; set; } = null!;
}
