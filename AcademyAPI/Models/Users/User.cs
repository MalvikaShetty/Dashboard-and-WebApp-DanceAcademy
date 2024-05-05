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
        public string Token { get; set; } = "";

        public User(string username, string password, string role)
        {
            Username = username;
            Password = password;
            Role = role;
        }
    }
}
