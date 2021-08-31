using System;
using System.Linq;
using System.Collections.Generic;
using Services.Bands;
using Data.Bands;

using BandServiceModel = Services.Bands.Models.Band;
using BandDataModel = Data.Bands.Models.Band;

namespace API.Tests.Bands
{
    public class BandsServiceFake: IBandsService
    {
        private readonly IBandsRepository _bandsRepository;

        public BandsServiceFake()
        {
            _bandsRepository = new BandsRepositoryFake();
        }

        public BandServiceModel Add(BandServiceModel band)
        {
            BandDataModel newBand = new BandDataModel
            {
                Id = Guid.NewGuid(),
                Name = band.Name
            };

            var result = _bandsRepository.Add(newBand);

            return new BandServiceModel { Id = newBand.Id, Name = newBand.Name };
        }

        public BandServiceModel Get(Guid id)
        {
            var result = _bandsRepository.Get(id);

            if (result != null)
            {
                return new BandServiceModel { Id = result.Id, Name = result.Name };
            }

            return null;
        }

        public IEnumerable<BandServiceModel> Get()
        {
            var results = _bandsRepository.Get();

            var bands = results
                .Select(o => new BandServiceModel { Id = o.Id, Name = o.Name });

            return bands;
        }

        public void Remove(BandServiceModel band)
        {
            BandDataModel bandToRemove = new BandDataModel
            {
                Id = band.Id,
                Name = band.Name
            };

            _bandsRepository.Remove(bandToRemove);
        }
    }
}
