using System.Security.Cryptography;
using System.Text;


namespace MarkaSkor.Services;

public interface IUtilityService
{
    public string GenerateRandomCode(int length);
}

public class UtilityService : IUtilityService
{
    public string GenerateRandomCode(int length)
    {
        const string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

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