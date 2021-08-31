using System;
using System.Collections.Generic;
using Data.Bands.Models;

namespace Data.Bands
{
    public interface IBandsRepository
    {
        IEnumerable<Band> Get();
        Band Get(Guid id);
        Band Add(Band band);
        void Remove(Band band);
    }
}
