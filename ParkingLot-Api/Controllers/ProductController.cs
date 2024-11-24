using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ParkingLot_Api.Entities;
using MODELS.DANHMUC;
namespace ParkingLot_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _context;
        public ProductController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var products = _context.Products.ToList();
                if (products.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id) 
        {
            try
            {
                var product = _context.Products.Find(id);
                if (product == null)
                {
                    return NotFound($"Không tìm thấy sản phẩm có id {id}");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post(Product model)
        {
            try
            {
                if (model.Id == Guid.Empty)
                {
                    model.Id = Guid.NewGuid();
                }                
                _context.Products.Add(model);
                _context.SaveChanges();
                return Ok("Sản phẩm đã được tạo");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(MODELProduct model)
        {
            try
            {
                if (model == null || model.Id == Guid.Empty)
                {
                    if (model == null)
                    {
                        return BadRequest("Dữ liệu không tồn tại");
                    }
                    else if (model.Id == Guid.Empty)
                    {
                        return BadRequest("Sản phẩm không tồn tại");
                    }
                }
                var product = _context.Products.Find(model.Id);
                product.Name = model.Name;
                product.Price = model.Price;
                product.Quantity = model.Quantity;
                _context.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var product = _context.Products.Find(id);
                if (product == null)
                {
                    return NotFound("Không tìm thấy sản phẩm");
                }
                _context.Products.Remove(product);
                _context.SaveChanges();
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
