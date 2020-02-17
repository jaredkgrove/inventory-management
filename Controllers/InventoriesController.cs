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
    public class InventoriesController : ControllerBase
    {
        private readonly ScoutContext _context;
         private readonly IMapper _mapper;

        public InventoriesController(ScoutContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventory()
        {
            var inentories = await _context.Inventory
            .Include(i => i.Product)
            .Include(i => i.Bin)
            .ToListAsync();

            return Ok(inentories.Select(i => _mapper.Map<InventoryDto>(i)));
        }

        // GET: api/Inventories/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Inventory>> GetInventory(long id)
        // {
        //     var inventory = await _context.Inventory
        //     .Include(i => i.Product)
        //     .Include(i => i.Bin)
        //     .FirstOrDefaultAsync(i => i.InventoryID == id);

        //     if (inventory == null)
        //     {
        //         return NotFound();
        //     }

        //     return inventory;
        // }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.

        [HttpPut("MoveInventory/{id}")]
        public async Task<ActionResult<Inventory>> MoveInventory(long id, MoveInventoryDto moveInventoryDto)
        {
            if (id != moveInventoryDto.SourceInventoryID)
            {
                return BadRequest();
            }

            var sourceInventory = await _context.Inventory
                .Include(i => i.Product)
                .Include(i => i.Bin)
                .FirstOrDefaultAsync(i => i.InventoryID == moveInventoryDto.SourceInventoryID);


            var DestinationPostResponse = await PostInventory(new Inventory
                {
                    BinID= moveInventoryDto.DestinationBinID,
                    ProductID= moveInventoryDto.ProductID,
                    QTY= moveInventoryDto.QTY
                }
            );
            
            sourceInventory.QTY -= moveInventoryDto.QTY;
            var SourcePutResponse = await PutInventory(sourceInventory.InventoryID, sourceInventory);
    

            // _context.Entry(sourceInventory).State = EntityState.Modified;
            // await _context.SaveChangesAsync();

            return (ActionResult)SourcePutResponse;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(long id, Inventory inventory)
        {
            if (id != inventory.InventoryID)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            if(inventory.QTY <= 0){
                _context.Inventory.Remove(inventory);
                await _context.SaveChangesAsync();
            }

            return Ok(_mapper.Map<InventoryDto>(inventory));
        }

        // POST: api/Inventories
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
        {
           var existingInventory = await _context.Inventory
                .Include(i => i.Product)
                .Include(i => i.Bin)
                .FirstOrDefaultAsync(i => i.BinID == inventory.BinID && i.ProductID == inventory.ProductID);

           if(existingInventory != null){
               existingInventory.QTY += inventory.QTY;
               var PutResponse = await PutInventory(existingInventory.InventoryID, existingInventory);
               return (ActionResult)PutResponse;
           }

           _context.Inventory.Add(inventory);
            await _context.SaveChangesAsync();

            var inv = await _context.Inventory
                .Include(i => i.Product)
                .Include(i => i.Bin)
                .FirstOrDefaultAsync(i => i.InventoryID == inventory.InventoryID);

            return CreatedAtAction("GetInventory", new { id = inventory.InventoryID }, _mapper.Map<InventoryDto>(inv));
        }

        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Inventory>> DeleteInventory(long id)
        {
            var inventory = await _context.Inventory.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventory.Remove(inventory);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<InventoryDto>(inventory));
        }

        private bool InventoryExists(long id)
        {
            return _context.Inventory.Any(e => e.InventoryID == id);
        }
    }
}
