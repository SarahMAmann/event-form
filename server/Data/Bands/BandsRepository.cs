using System;
using System.Collections.Generic;
using System.Linq;
using Data.Bands.Models;

namespace Data.Bands
{
    public class BandsRepository : IBandsRepository
    {
        private readonly StarterContext _dataContext;

        public BandsRepository(StarterContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<Band> Get()
        {
            return _dataContext
                .Bands
                .Select(x => new Band { Id = x.Id, Name = x.Name })
                .OrderBy(x => x.Name)
                .ToList();
        }

        public Band Add(Band band)
        {
            _dataContext.Bands.Add(band);

            _dataContext.SaveChanges();

            return band;
        }

        public Band Get(Guid id)
        {
            return _dataContext
                .Bands
                .Where(x => x.Id == id)
                .FirstOrDefault();
        }

        public void Remove(Band band)
        {
            // Soft delete
            //band.IsActive = false;
            //_dataContext.Bands.Update(band);

            // Hard delete
            _dataContext.Remove(band);
        }
    }
}
