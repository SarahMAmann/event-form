using System;
using Microsoft.EntityFrameworkCore;

using Data.Models;
using Data.Bands.Models;

namespace Data
{
    public class Seed
    {
        private readonly ModelBuilder _modelBuilder;

        public Seed(ModelBuilder modelBuilder)
        {
            _modelBuilder = modelBuilder;
        }

        public void AddData()
        {
            AddRoles();
            AddBand();
        }

        private void AddRoles()
        {
            _modelBuilder.Entity<ApplicationRole>().HasData(
                new ApplicationRole { Id = 1, Name = "User", NormalizedName = "USER", Description = "User", ConcurrencyStamp = "3dea0570-f00f-4fcd-b368-7831cde1e0ff" },
                new ApplicationRole { Id = 2, Name = "Admin", NormalizedName = "ADMIN", Description = "Admin", ConcurrencyStamp = "4a84eb50-ca0f-4cf6-b040-e4cdd2eb2638" }
            );
        }

        private void AddBand()
        {
            _modelBuilder.Entity<Band>().HasData(
                new Band { Id = Guid.NewGuid(), Name = "AC/DC" },
                new Band { Id = Guid.NewGuid(), Name = "The Allman Brothers Band" },
                new Band { Id = Guid.NewGuid(), Name = "Blondie" },
                new Band { Id = Guid.NewGuid(), Name = "The Grateful Dead" },
                new Band { Id = Guid.NewGuid(), Name = "Joy Division" },
                new Band { Id = Guid.NewGuid(), Name = "Led Zepplin" },
                new Band { Id = Guid.NewGuid(), Name = "Pavement" },
                new Band { Id = Guid.NewGuid(), Name = "Pink Floyd" },
                new Band { Id = Guid.NewGuid(), Name = "The Police" },
                new Band { Id = Guid.NewGuid(), Name = "The Rolling Stones" },
                new Band { Id = Guid.NewGuid(), Name = "Sonic Youth" },
                new Band { Id = Guid.NewGuid(), Name = "Talking Heads" },
                new Band { Id = Guid.NewGuid(), Name = "The Velvet Underground" },
                new Band { Id = Guid.NewGuid(), Name = "The Beatles" },
                new Band { Id = Guid.NewGuid(), Name = "The Cars" },
                new Band { Id = Guid.NewGuid(), Name = "Janis Joplin" }
            );
        }
    }
}