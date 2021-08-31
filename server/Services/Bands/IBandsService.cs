using System;
using System.Collections.Generic;
using Services.Bands.Models;

namespace Services.Bands
{
    public interface IBandsService
    {
        Band Get(Guid id);
        IEnumerable<Band> Get();
        Band Add(Band band);
        void Remove(Band band);
    }
}
