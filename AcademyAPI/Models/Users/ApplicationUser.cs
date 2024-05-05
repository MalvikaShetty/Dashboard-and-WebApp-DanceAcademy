using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models.Users
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(30)]
        public string? Username { get; set; }
    }
}
