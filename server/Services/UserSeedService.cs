using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class UserSeedService : IUserSeedService
    {
        private readonly StarterContext _dataContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserSeedService(StarterContext dataContext, RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public async Task LoadUsers()
        {
            if (!_dataContext.Users.Any())
            {
                await SeedUsers();
            }
        }

        private async Task SeedUsers()
        {
            try
            {
                var userOne = new ApplicationUser
                {
                    UserName = "AAdmin",
                    FirstName = "Arthur",
                    LastName = "Admin",
                    Email = "admin@myproject.com",
                };

                await _userManager.CreateAsync(userOne, "Admin77$");
                await _userManager.AddToRoleAsync(userOne, "Admin");
                
                var userTwo = new ApplicationUser
                {
                    UserName = "JUser",
                    FirstName = "Johnny",
                    LastName = "User",
                    Email = "user@myproject.com",
                };

                await _userManager.CreateAsync(userTwo, "Johhny5!");
                await _userManager.AddToRoleAsync(userTwo, "User");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
