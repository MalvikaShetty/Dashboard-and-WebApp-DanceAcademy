using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models.Users
{
    public class User
    {
        [Key]
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public string Role { get; set; } = "User";
        public bool IsActive { get; set; } = false;
        public bool? EmailConfirmed { get; set; } = false;

        // This enables the one-to-many relationship where a user can have many refresh tokens
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

        public User() { }
       /* public User(string? username, string? password, bool? emailConfirmed)
        {
            Username = username;
            Password = password;
            EmailConfirmed = emailConfirmed;
        }*/
    }
}
