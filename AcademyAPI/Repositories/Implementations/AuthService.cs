using AcademyAPI.Models;
using AcademyAPI.Models.Users;
using AcademyAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;

namespace AcademyAPI.Repositories.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly AcademyDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(AcademyDbContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<(User user, string token)> Login(string email, string password)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.Username == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return (null, null);
            }

            user.IsActive = true;
            var token = GenerateAndSetTokens(user);
            await _context.SaveChangesAsync();
            return (user, token);
        }

        public async Task<(User user, string token)> AuthenticateGoogleUser(string idToken)
        {
            GoogleJsonWebSignature.Payload payload = null;
            try
            {
                // Validate the token and ensure it's for your app's client ID
                payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new List<string> { _configuration["GoogleLogin:GoogleClientID"]!}
                });
            }
            catch (Exception ex)
            {
                // Log exception details if needed
                return (null, null);
            }

            if (payload == null)
                return (null, null);

            // Check if the user exists in the database by email
            var user = await _context.users.FirstOrDefaultAsync(u => u.Username == payload.Email);
            if (user == null)
            {
                // User does not exist, so create a new one
                user = new User
                {
                    Username = payload.Email, // Optionally use part of the email or another identifier
                    EmailConfirmed = true, // Since Google has already confirmed the email
                    IsActive = true // Automatically activate OAuth users
                };

                _context.users.Add(user);
                var result = await _context.SaveChangesAsync();
                if (result == 0)
                    return (null, null);
            }

            // Generate JWT token for the user
            var token = GenerateAndSetTokens(user); // Ensure this method handles the new User structure
            return (user, token);
        }

        private string GenerateAndSetTokens(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.RefreshTokens.Add(GenerateRefreshToken());
            return tokenHandler.WriteToken(token);
        }

        public async Task<(bool IsSuccess, string Token)> RefreshToken(string refreshToken)
        {
            var user = await _context.users
        .Include(u => u.RefreshTokens) // Ensure you include RefreshTokens in the query
        .FirstOrDefaultAsync(u => u.RefreshTokens.Any(rt => rt.Token == refreshToken && rt.Expires > DateTime.UtcNow));

            if (user == null)
            {
                return (false, "Token not valid or expired.");
            }

            var newToken = GenerateAndSetTokens(user);
            await _context.SaveChangesAsync();
            return (true, newToken);
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(1) // Set the expiration date
            };

            SetRefreshTokenCookie(refreshToken.Token, refreshToken.Expires); // Set the cookie with the refresh token
            return refreshToken;
        }

        private void SetRefreshTokenCookie(string token, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = expires,
                Secure = true, // Ensure this is true if using HTTPS
                SameSite = SameSiteMode.Strict // Set to Strict or Lax depending on your cross-site requirements
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        public async Task<User> Register(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UpdateUserRole(string username, string newRole)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return false;
            }

            user.Role = newRole;
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
