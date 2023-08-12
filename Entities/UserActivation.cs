using System;
using System.Collections.Generic;

namespace MarkaSkor.Entities;

public partial class UserActivation
{
    public int id { get; set; }

    public string phoneNumber { get; set; } = null!;

    public string activationCode { get; set; } = null!;

    public DateTime creationDate { get; set; }

    public DateTime expirationDate { get; set; }
}
