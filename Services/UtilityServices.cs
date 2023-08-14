using System.Security.Cryptography;
using System.Text;


namespace MarkaSkor.Services;

public interface IUtilityService
{
    /// <summary>
    /// Generates a random code of the specified length and type.
    /// </summary>
    /// <param name="length">The length of the random code to generate.</param>
    /// <param name="type">Changes allowed chars, "code" or "number"</param>
    /// <returns>A randomly generated code.</returns>
    public string GenerateRandom(int length, string? type);
}

public class UtilityService : IUtilityService
{
    public string GenerateRandom(int length, string? type)
    {
        string allowedChars = type == "code" ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" : "1234567890";
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            byte[] randomBytes = new byte[length];
            rng.GetBytes(randomBytes);

            StringBuilder sb = new StringBuilder(length);
            foreach (byte b in randomBytes)
            {
                sb.Append(allowedChars[b % allowedChars.Length]);
            }

            return sb.ToString();
        }
    }
}