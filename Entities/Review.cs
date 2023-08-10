using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Review
{
    public int id { get; set; }

    public string? comment { get; set; }

    public byte? rating { get; set; }

    public int brandId { get; set; }

    public int userId { get; set; }

    public virtual Brand brand { get; set; } = null!;

    public virtual User user { get; set; } = null!;
}
