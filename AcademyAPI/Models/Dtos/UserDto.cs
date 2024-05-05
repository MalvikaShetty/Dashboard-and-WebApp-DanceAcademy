using AcademyAPI.Models.Users;

namespace AcademyAPI.Models.Dtos
{
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; }
    }
}


