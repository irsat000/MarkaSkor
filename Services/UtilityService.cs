
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
        StringBuilder result = new(length);
        Random random = new();
        for (int i = 0; i < length; i++)
        {
            int randomIndex = random.Next(allowedChars.Length);
            result.Append(allowedChars[randomIndex]);
        }
        return result.ToString();
    }
}
