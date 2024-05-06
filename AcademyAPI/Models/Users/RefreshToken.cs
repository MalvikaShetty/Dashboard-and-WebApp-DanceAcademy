using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyAPI.Models.Users
{
    public class RefreshToken
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Unique identifier for each token

        [Required]
        public string Token { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime Expires { get; set; }

        // Foreign key to User
        [ForeignKey("User")]
        public string Username { get; set; }
        public User User { get; set; }
    }
}
