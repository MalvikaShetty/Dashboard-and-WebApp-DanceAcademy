using AcademyAPI.Models.Users;

namespace AcademyAPI.Repositories.Interfaces
{
    public interface IAuthService
    {
        public Task<User> Login(string email, string password);
        public Task<User> Register(User user);
        public Task<bool> UpdateUserRole(string email, string newRole);
        
    }
}
