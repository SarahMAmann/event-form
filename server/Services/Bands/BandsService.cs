using System.Linq;
using Services.Bands.Models;
using Data.Bands;
using System.Collections.Generic;
using BandDataModel = Data.Bands.Models.Band;
using System;

namespace Services.Bands
{
    public class BandsService: IBandsService
    {
        private readonly IBandsRepository _bandsRepository;

        public BandsService(IBandsRepository bandsRepository)
        {
            _bandsRepository = bandsRepository;
        }

        public IEnumerable<Band> Get()
        {
            var bands = _bandsRepository.Get();

            return bands.Select(x => new Band
            {
                Id = x.Id,
                Name = x.Name
            });
        }

        public Band Add(Band band)
        {
            var bandDataObject = new BandDataModel { Name = band.Name };

            var result = _bandsRepository.Add(bandDataObject);

            return new Band { Id = result.Id, Name = result.Name };
        }

        public Band Get(Guid id)
        {
            var result = _bandsRepository.Get(id);

            return new Band { Id = result.Id, Name = result.Name };
        }

        public void Remove(Band band)
        {
            var bandDataObject = new BandDataModel { Id = band.Id, Name = band.Name };

            _bandsRepository.Remove(bandDataObject);
        }
    }
}
