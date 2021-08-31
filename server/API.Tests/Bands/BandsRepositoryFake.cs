using System;
using System.Collections.Generic;
using System.Linq;
using Data.Bands;

//using BandServiceModel = Services.Bands.Models.Band;
using BandDataModel = Data.Bands.Models.Band;


namespace API.Tests.Bands
{
    public class BandsRepositoryFake: IBandsRepository
    {
        private readonly List<BandDataModel> _bands;

        public BandsRepositoryFake()
        {
            _bands = new List<BandDataModel>()
            {
                new BandDataModel
                {
                    Id = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200"),
                    Name = "Post Malone"
                },
                new BandDataModel
                {
                    Id = new Guid("880660ae-81ed-4477-9389-bdeb43bfa825"),
                    Name = "Juice WRLD"
                },
                new BandDataModel
                {
                    Id = new Guid("3a649c91-b912-4c70-b113-1cf561b6848d"),
                    Name = "Future"
                }
            };
        }

        public BandDataModel Add(BandDataModel band)
        {
            band.Id = Guid.NewGuid();

            _bands.Add(band);

            return band;
        }

        public IEnumerable<BandDataModel> Get()
        {
            return _bands;
        }

        public BandDataModel Get(Guid id)
        {
            return _bands.Where(o => o.Id == id).FirstOrDefault();
        }

        public void Remove(BandDataModel band)
        {
            var bandToRemove = _bands.Where(x => x.Id == band.Id).FirstOrDefault();

            _bands.Remove(bandToRemove);
        }
    }
}
