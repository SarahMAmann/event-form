using System;
using System.Collections.Generic;
using System.Linq;
using API.Controllers.Bands.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Bands;
using BandServiceModel = Services.Bands.Models.Band;

namespace API.Controllers.Bands
{
    [Route("api/[controller]")]
    [ApiController]
    public class BandsController : ControllerBase
    {
        private readonly IBandsService _bandsService;

        public BandsController(IBandsService bandsService)
        {
            _bandsService = bandsService;
        }

        [HttpGet("{id}")]
        public ActionResult<Band> Get(Guid id)
        {
            var result = _bandsService.Get(id);

            if (result == null)
            {
                return NotFound();
            }

            var band = new Band { Id = result.Id, Name = result.Name };

            return Ok(band);
        }

        [Authorize("ApiAccess")]
        [HttpGet]
        public ActionResult<IEnumerable<Band>> Get()
        {
            var results = _bandsService.Get();

            var bands = results.Select(x => new Band { Id = x.Id, Name = x.Name }).ToList();

            return Ok(bands);
        }

        [HttpPost]
        public ActionResult Add([FromBody] Band band)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bandServiceObject = new BandServiceModel { Name = band.Name };

            var result = _bandsService.Add(bandServiceObject);

            return CreatedAtAction("Get", new { result.Id }, new Band { Id = result.Id, Name = result.Name });
        }

        [HttpPost("sendPasswordLink")]
        public ActionResult<ResponseModel> SendPasswordLink([FromBody] ResponseModel request)
        {
            ResponseModel mockResponse = new ResponseModel
            {
                Success = true,
                Message = "Email sent"
            };

            return Ok(mockResponse);
        }

        [HttpDelete("{id}")]
        public ActionResult Remove(Guid id)
        {
            var band = _bandsService.Get(id);

            if (band == null)
            {
                return NotFound();
            }

            _bandsService.Remove(band);

            return Ok();
        }
    }
}
