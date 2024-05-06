using AcademyAPI.Models.Users;

namespace AcademyAPI.Repositories.Interfaces
{
    public interface IAuthService
    {
        public Task<(User user, string token)> Login(string email, string password);
        public Task<(User user, string token)> AuthenticateGoogleUser(string idToken);
        public Task<User> Register(User user);
        public Task<bool> UpdateUserRole(string email, string newRole);
        public Task<(bool IsSuccess, string Token)> RefreshToken(string refreshToken);

    }
}
