using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scout.Models;

namespace Scout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinsController : ControllerBase
    {
        private readonly ScoutContext _context;
        private readonly IMapper _mapper;
        public BinsController(ScoutContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Bins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bin>>> GetBin()
        {
            var bins = await _context.Bin
                // .Include(b => b.Inventories)
                // .ThenInclude(i => i.Product)
                .ToListAsync();

            return Ok(bins.Select(b => _mapper.Map<BinDto>(b)));
        }

        // GET: api/Bins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bin>> GetBin(long id)
        {
            var bin = await _context.Bin
                .Include(p => p.Inventories)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(b => b.BinID == id);

            
            // var response = new
            // {
            //     binID = bin.BinID,
            //     binName = bin.BinName,
            //     Inventories = bin.Inventories.Select(i => new {i.InventoryID, i.ProductID, i.Product.ProductDescription, i.Product.SKU, i.QTY}),
            // };

            if (bin == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BinDto>(bin));
        }

        // PUT: api/Bins/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBin(long id, Bin bin)
        {
            
            if (id != bin.BinID)
            {
                return BadRequest();
            }

            _context.Entry(bin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BinExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(_mapper.Map<BinDto>(bin));;
        }

        // POST: api/Bins
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Bin>> PostBin(Bin bin)
        {
            _context.Bin.Add(bin);
            await _context.SaveChangesAsync();
            
            var createdBin = await _context.Bin.
                Include(b => b.Inventories)
                .FirstOrDefaultAsync(b => b.BinID == bin.BinID);
            // var response = new
            // {
            //     binID = createdBin.BinID,
            //     binName = createdBin.BinName,
            //     Inventories = createdBin.Inventories.Select(i => new {i.InventoryID, i.ProductID, i.Product.ProductDescription, i.Product.SKU, i.QTY}),
            // };

            return CreatedAtAction("GetBin", new { id = createdBin.BinID }, _mapper.Map<BinDto>(createdBin));
        }

        // DELETE: api/Bins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bin>> DeleteBin(long id)
        {
            var bin = await _context.Bin
                .Include(p => p.Inventories)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(b => b.BinID == id);

            if (bin == null)
            {
                return NotFound();
            }
            
            _context.Bin.Remove(bin);
            await _context.SaveChangesAsync();

            // var response = new
            // {
            //     binID = bin.BinID,
            //     binName = bin.BinName,
            //     Inventories = bin.Inventories.Select(i => new {i.InventoryID, i.ProductID, i.Product.ProductDescription, i.Product.SKU, i.QTY}),
            // };

            return Ok(_mapper.Map<BinDto>(bin));
        }

        private bool BinExists(long id)
        {
            return _context.Bin.Any(e => e.BinID == id);
        }
    }
}
