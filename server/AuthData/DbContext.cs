using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using AuthData.Models;

namespace AuthData
{
    public class DbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DbContext()
        {
        }

        public DbContext(DbContextOptions<DbContext> options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override int SaveChanges()
        {
            AddAuditInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuditInfo();
            return await base.SaveChangesAsync(true);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(ConnectionStringProvider.GetConnectionString());
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>(x =>
            {
                x.HasIndex(y => y.Email)
                 .IsUnique();

                x.HasIndex(y => y.UserName)
                   .IsUnique(false);

                x.HasIndex(y => y.NormalizedUserName)
                  .IsUnique(false);
            });
        }

        private void AddAuditInfo()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is AuditBase && (x.State == EntityState.Added || x.State == EntityState.Modified));

            var userContext = _httpContextAccessor?.HttpContext?.User;
            var curentUsername = userContext != null ? userContext.FindFirst(ClaimTypes.Name)?.Value : "System";

            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((AuditBase)entity.Entity).CreatedOn = DateTime.UtcNow;
                }

                ((AuditBase)entity.Entity).UpdatedOn = DateTime.UtcNow;
                ((AuditBase)entity.Entity).UpdatedBy = curentUsername;
            }
        }
    }
}
