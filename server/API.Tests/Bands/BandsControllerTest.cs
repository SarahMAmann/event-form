using System;
using System.Collections.Generic;
using System.Linq;
using API.Controllers.Bands;
using API.Controllers.Bands.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Bands;
using Xunit;

namespace API.Tests.Bands
{
    public class BandsControllerTest
    {
        readonly BandsController _controller;
        readonly IBandsService _service;
 
        public BandsControllerTest()
        {
            _service = new BandsServiceFake();
            _controller = new BandsController(_service);
        }

        /*
         * Decorate test methods with the [Fact] attribute, which is used by the xUnit framework marking them as testing methods
         * 
         * When writing unit tests the practice to follow is the AAA principle (Arrange, Act and Assert):
         * 
         * Arrange – Create any necessary resources, for example a new Guid when testing GET, or a new object for POST
         * 
         * Act – this is where the method we are testing is executed
         * 
         * Assert – this is the final part of the test where we compare what we expect to happen with the actual result of the test method execution
         * 
         * Not all tests will use all principles
         * 
         */

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.Get();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.Get().Result as OkObjectResult;

            // Assert
            var items = Assert.IsType<List<Band>>(okResult.Value);

            //var bands = Assert.IsType<List<Band>>(items.Select(x => new Band { Id = x.Id, Name = x.Name }));

            Assert.Equal(3, items.Count);
        }

        [Fact]
        public void GetById_UnknownGuidPassed_ReturnsNotFoundResult()
        {
            // Act
            var notFoundResult = _controller.Get(Guid.NewGuid());

            //Assert 
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsOkResult()
        {
            // Arrange
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            // Act
            var okResult = _controller.Get(testGuid);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsRightItem()
        {
            // Arrange
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            // Act
            var okResult = _controller.Get(testGuid).Result as OkObjectResult;

            // Assert
            Assert.IsType<Band>(okResult.Value);
            Assert.Equal(testGuid, (okResult.Value as Band).Id);
        }

        [Fact]
        public void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            // Arrange
            var nameMissingItem = new Band {};

            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var badResponse = _controller.Add(nameMissingItem);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }


        [Fact]
        public void Add_ValidObjectPassed_ReturnsCreatedResponse()
        {
            // Arrange
            Band testItem = new Band
            {
                Name = "Marshmello"
            };

            // Act
            var createdResponse = _controller.Add(testItem);

            // Assert
            Assert.IsType<CreatedAtActionResult>(createdResponse);
        }


        [Fact]
        public void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            // Arrange
            var testItem = new Band
            {
                Name = "Miranda Lambert"
            };

            // Act
            var createdResponse = _controller.Add(testItem) as CreatedAtActionResult;
            var item = createdResponse.Value as Band;

            // Assert
            Assert.IsType<Band>(item);
            Assert.Equal("Miranda Lambert", item.Name);
        }

        [Fact]
        public void Remove_NotExistingGuidPassed_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingGuid = Guid.NewGuid();

            // Act
            var badResponse = _controller.Remove(notExistingGuid);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public void Remove_ExistingGuidPassed_ReturnsOkResult()
        {
            // Arrange
            var existingGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            // Act
            var okResponse = _controller.Remove(existingGuid);

            // Assert
            Assert.IsType<OkResult>(okResponse);
        }
        [Fact]
        public void Remove_ExistingGuidPassed_RemovesOneItem()
        {
            // Arrange
            var existingGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");

            // Act
            var okResponse = _controller.Remove(existingGuid);

            // Assert
            Assert.Equal(2, _service.Get().Count());
        }
    }
}
