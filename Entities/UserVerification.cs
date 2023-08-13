using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class UserVerification
{
    public int id { get; set; }

    public int userId { get; set; }

    public string verficationCode { get; set; } = null!;

    public DateTime creationDate { get; set; }

    public DateTime expirationDate { get; set; }

    public virtual User user { get; set; } = null!;
}
