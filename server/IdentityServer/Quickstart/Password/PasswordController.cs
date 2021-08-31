using System.Threading.Tasks;
using AuthData.Models;
using IdentityServer.Quickstart.Password;
using IdentityServer.Quickstart.SharedModels;
using IdentityServer.Services;
using IdentityServerHost.Quickstart.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RestSharp;

namespace IdentityServer.Quickstart.UI
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class PasswordController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IApiHttpService _httpService;

        public PasswordController(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IApiHttpService httpService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _httpService = httpService;
        }

        [HttpGet]
        public async Task<IActionResult> SetPassword([FromQuery(Name = "userId")] int userId,
                                         [FromQuery(Name = "passwordToken")] string passwordToken,
                                         [FromQuery(Name = "emailToken")] string emailToken)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(userId.ToString());

            IdentityResult confirm = await _userManager.ConfirmEmailAsync(user, emailToken);

            if (confirm.Succeeded)
            {
                SetPasswordInputModel vm = new SetPasswordInputModel
                {
                    UserId = userId,
                    Email = user.Email,
                    ResetToken = passwordToken
                };
                return View(vm);
            }

            return Redirect("./LockOut");

        }

        [HttpPost]
        public async Task<IActionResult> SetPassword(SetPasswordInputModel model)
        {

            ApplicationUser user = await _userManager.FindByEmailAsync(model.Email);

            await _userManager.ResetPasswordAsync(user, model.ResetToken, model.Password);
           
            return Redirect(_configuration.GetValue<string>("UIBaseUrl"));
        }


        [HttpPost]
        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPasswordRequest resetPasswordRequest)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(resetPasswordRequest.Email);
            ResponseModel response = new ResponseModel();
            if (user != null && user.Email == resetPasswordRequest.Email)
            {
                string passwordToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                string emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.Action(
                    action: "SetPassword",
                    controller: "Password",
                    values: new { userId = user.Id, passwordToken, emailToken },
                    protocol: Request.Scheme);

                EmailMetadata content = new EmailMetadata
                {
                    RecipientEmail = user.Email,
                    ResetToken = callbackUrl
                };

                IRestRequest request = new RestRequest("bands/sendPasswordLink", Method.POST)
                        .AddJsonBody(content);

                response = await _httpService.ExecuteAsync<ResponseModel>(request);
            }
            else
            {
                response.Error = true;
                response.Message = "User not found.";
            }
            return Ok(response);
        }
    }
}
