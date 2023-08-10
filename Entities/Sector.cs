using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class Sector
{
    public int id { get; set; }

    public string sectorKey { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; } = new List<Category>();
}
