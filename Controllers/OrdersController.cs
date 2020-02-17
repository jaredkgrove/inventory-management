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
    public class OrdersController : ControllerBase
    {
        private readonly ScoutContext _context;
        private readonly IMapper _mapper;

        public OrdersController(ScoutContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            var orders = await _context.Order
                .Include(o => o.OrderLines)
                .ThenInclude(ol => ol.Product)
                .ToListAsync();

            return Ok(orders.Select(o => _mapper.Map<OrderDto>(o)));
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(long id)
        {
            var order = await _context.Order
                .Include(o => o.OrderLines)
                .ThenInclude(ol => ol.Product)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<OrderDto>(order));
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutOrder(long id, Order order)
        // {
        //     if (id != order.OrderID)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(order).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!OrderExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        [HttpPut("{id}/FillOrder")]
        public async Task<ActionResult<Order>> FillOrder(long id, FillOrderDto fillOrderDto)
        {

            if (id != fillOrderDto.OrderID)
            {
                return BadRequest();
            }

            var order = await _context.Order
                .Include(o => o.OrderLines)
                .ThenInclude(ol => ol.Product)
                .FirstOrDefaultAsync(o => o.OrderID == id);
            
            var fillOrderLines = fillOrderDto.FillOrderLines;
            var inventories = _context.Inventory
                .Include(i => i.Product)
                .Include(i => i.Bin)
                .AsEnumerable()
                .Where(i => fillOrderLines.Any(fol => fol.InventoryID == i.InventoryID))
                .ToList();
            
            inventories.ForEach(i => {
                var orderLine = order.OrderLines.Find(ol => ol.ProductID == i.ProductID);
                i.FillOrderLine(orderLine);
                _context.Entry(i).State = EntityState.Modified;
            });

            order.OrderFilled = true;
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<OrderDto>(order));
        }

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Order.Add(order);
            await _context.SaveChangesAsync();
            
            var createdOrder = await _context.Order.
            Include(o => o.OrderLines)
            .ThenInclude(ol => ol.Product)
            .FirstOrDefaultAsync(o => o.OrderID == order.OrderID);

            return CreatedAtAction("GetBin", new { id = createdOrder.OrderID }, _mapper.Map<OrderDto>(createdOrder));
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(long id)
        {
            var order = await _context.Order
                .Include(o => o.OrderLines)
                .ThenInclude(ol => ol.Product)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null)
            {
                return NotFound();
            }
            
            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<OrderDto>(order));
        }

        private bool OrderExists(long id)
        {
            return _context.Order.Any(e => e.OrderID == id);
        }
    }
}
