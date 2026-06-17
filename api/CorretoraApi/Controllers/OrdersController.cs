using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
  private readonly AppDbContext _context;

  public OrdersController(AppDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Lista todas as ordens de compra e venda do usuário.
  /// </summary>
  [HttpGet]
  [Produces("application/json")]
  [ProducesResponseType(typeof(IEnumerable<OrderResponse>), StatusCodes.Status200OK)]
  public async Task<IActionResult> GetOrders()
  {
    var orders = await _context.Orders
    .Include(o => o.Asset).ToListAsync();

    var result = orders.Select(o => new OrderResponse
    {
      Id = o.Id,
      Quantity = o.Quantity,
      Type = o.Type.ToString(),
      Status = o.Status.ToString(),
      AssetName = o.Asset.Name
    }).ToList();

    return Ok(result);
  }
}

