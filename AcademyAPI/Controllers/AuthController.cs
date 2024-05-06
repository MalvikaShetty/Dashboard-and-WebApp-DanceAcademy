using AcademyAPI.Models;
using AcademyAPI.Models.Dtos;
using AcademyAPI.Models.Users;
using AcademyAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Username))
            {
                return BadRequest(new { message = "Username is required." });
            }
            else if (string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { message = "Password is required." });
            }
            User userToRegister = new User { Username = userDto.Username, Password = userDto.Password, IsActive = true };

            var registeredUser = await _authService.Register(userToRegister);
            var (user, token) = await _authService.Login(registeredUser.Username, userDto.Password);

            if (user != null && !string.IsNullOrEmpty(token))
            {
                // Return only safe user data
                return Ok(new { User = new { user.Username, user.Role, user.IsActive }, Token = token });
            }

            return BadRequest(new { message = "User registration unsuccessful." });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Username))
            {
                return BadRequest(new { message = "Username is required." });
            }
            else if (string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest(new { message = "Password is required." });
            }

            var (user, token) = await _authService.Login(loginDto.Username, loginDto.Password);

            if (user != null && !string.IsNullOrEmpty(token))
            {
                // Return only safe user data
                return Ok(new { User = new { user.Username, user.Role, user.IsActive }, Token = token });
            }

            return BadRequest(new { message = "User login unsuccessful. Please check username and password." });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenDto tokenDto)
        {
            if (string.IsNullOrEmpty(tokenDto.IdToken))
            {
                return BadRequest(new { message = "Google token is missing." });
            }

            var (user, token) = await _authService.AuthenticateGoogleUser(tokenDto.IdToken);

            if (user == null || string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Google authentication failed." });
            }

            return Ok(new { User = new { user.Username, user.Role, user.IsActive }, Token = token });
        }


        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                return BadRequest("Refresh token is missing.");
            }

            var result = await _authService.RefreshToken(refreshToken);
            if (!result.IsSuccess)
            {
                return Unauthorized("Refresh token is not valid or has expired.");
            }

            return Ok(new { Token = result.Token });
        }

        [HttpPost("update-role/{username}")]
        public async Task<IActionResult> UpdateRole(string username, [FromBody] UpdateRoleDto roleUpdate)
        {
            if (string.IsNullOrEmpty(roleUpdate.Role))
            {
                return BadRequest("Role is required.");
            }

            if (roleUpdate.Role != "Admin" && roleUpdate.Role != "User")  // Extend with other roles as necessary
            {
                return BadRequest("Invalid role specified.");
            }

            var success = await _authService.UpdateUserRole(username, roleUpdate.Role);
            if (!success)
            {
                return NotFound("User not found.");
            }

            return Ok($"User role updated successfully to {roleUpdate.Role}.");
        }
    }
}
