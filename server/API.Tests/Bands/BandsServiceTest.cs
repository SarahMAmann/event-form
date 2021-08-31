using System;
using Services.Bands;
using Data.Bands;
using Xunit;
using BandDataModel = Data.Bands.Models.Band;
using System.Collections.Generic;
using System.Linq;

namespace API.Tests.Bands
{
    public class BandsServiceTest
    {
        private readonly BandsService _service;
        private readonly IBandsRepository _repository;

        public BandsServiceTest()
        {
            _repository = new BandsRepositoryFake();
            _service = new BandsService(_repository);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            var results = _repository.Get();

            var bands = Assert.IsType<List<BandDataModel>>(results);
            Assert.Equal(3, bands.Count);
        }

        [Fact]
        public void GetById_UnknownGuidPassed_ReturnsNull()
        {
            var nullResult = _repository.Get(Guid.NewGuid());

            Assert.Null(nullResult);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsBandDataModel()
        {
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            var result = _repository.Get(testGuid);

            Assert.IsType<BandDataModel>(result);
        }

        [Fact]
        public void Add_ValidObjectPassed_ReturnsBandDataModel()
        {
            BandDataModel band = new BandDataModel
            {
                Name = "DaBaby"
            };

            var result = _repository.Add(band);

            Assert.IsType<BandDataModel>(result);
            Assert.Equal("DaBaby", result.Name);
        }

        [Fact]
        public void Remove_ExistingGuidPassed_RemovesOneItem()
        {
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            var result = _service.Get(testGuid);

            var bandDataObject = new BandDataModel
            {
                Id = result.Id,
                Name = result.Name
            };

            _repository.Remove(bandDataObject);

            Assert.Equal(2, _repository.Get().Count());
        }
    }
}
