using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Brand__Category
{
    public int id { get; set; }

    public int brandId { get; set; }

    public int categoryId { get; set; }

    public virtual Brand brand { get; set; } = null!;

    public virtual Category category { get; set; } = null!;
}
