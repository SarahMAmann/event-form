using System.Threading.Tasks;

namespace Services
{
    public interface IUserSeedService
    {
        Task LoadUsers();
    }
}
