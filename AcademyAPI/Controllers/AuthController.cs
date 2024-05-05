using AcademyAPI.Models;
using AcademyAPI.Models.Dtos;
using AcademyAPI.Models.Users;
using AcademyAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            if (String.IsNullOrEmpty(user.Username))
            {
                return BadRequest(new { message = "Username needs to be entered" });
            }
            else if (String.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Password needs to be entered" });
            }
            User userToRegister = new(user.Username, user.Password, user.Role);

            User registeredUser = await _authService.Register(userToRegister);
            User loggedInUser = await _authService.Login(registeredUser.Username, user.Password);

            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }

            return BadRequest(new { message = "User registration unsuccessful" });

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto user)
        {
            if (String.IsNullOrEmpty(user.Username))
            {
                return BadRequest(new { message = "Username needs to entered" });
            }
            else if (String.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Password needs to entered" });
            }

            User loggedInUser = await _authService.Login(user.Username, user.Password);

            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }

            return BadRequest(new { message = "User login unsuccessful" });

        }

        [HttpPost("update-role/{username}")]
        public async Task<IActionResult> UpdateRole(string username, [FromBody] UpdateRoleDto roleUpdate)
        {
            if (string.IsNullOrEmpty(roleUpdate.Role))
            {
                return BadRequest("Role is required.");
            }

            // Checking the role to be "Admin" or any other roles before updating
            if (roleUpdate.Role != "Admin" && roleUpdate.Role != "User") // Extend with other roles as necessary
            {
                return BadRequest("Invalid role specified.");
            }

            var success = await _authService.UpdateUserRole(username, roleUpdate.Role);
            if (!success)
            {
                return NotFound("User not found.");
            }

            return Ok("User role updated successfully to " + roleUpdate.Role);
        }

    }
}
