using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
  private readonly AppDbContext _context;

  public OrdersController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<IActionResult> GetOrders()
  {
    var orders = await _context.Orders
    .Include(o => o.Asset).ToListAsync();

    var result = orders.Select(o => new
    {
      o.Id,
      o.Quantity,
      o.Type,
      o.Status,
      AssetName = o.Asset.Name
    }).ToList();

    return Ok(result);
  }
}

