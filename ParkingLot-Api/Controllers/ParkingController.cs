using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MODELS.DANHMUC;
using MODELS.NGHIEPVU;
using ParkingLot_Api.Entities;

namespace ParkingLot_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly MyDbContext _context;
        public ParkingController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                // Lấy danh sách các Parking mà IsDelete == false
                var parkings = _context.Parkings
                    .Where(p => p.IsDeleted == false) // Chỉ lấy những bản ghi có IsDelete == false
                    .ToList();

                if (parkings.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }

                return Ok(parkings);
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
                var parkings = _context.Parkings.Find(id);
                if (parkings == null || parkings.IsDeleted == true)
                {
                    return NotFound($"Không tìm thấy sản phẩm có mã {parkings.ParkingCode}");
                }
                return Ok(parkings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post(Parking model)
        {
            try
            {                
                if (model.Id == Guid.Empty)
                {
                    model.Id = Guid.NewGuid();
                }
                model.CreateBy = "Nguyen Phat";
                model.CreateDate = DateTime.Now;
                model.UpdateBy = "Nguyen Phat";
                model.UpdateDate = DateTime.Now;
                model.OpenTime = TimeOnly.MinValue;
                model.CloseTime = TimeOnly.MaxValue;
                model.IsDeleted = false;
                _context.Parkings.Add(model);
                _context.SaveChanges();
                return Ok("Bãi đậu xe đã được tạo");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(MODELParking model)
        {
            try
            {
                if (model == null || model.Id == Guid.Empty)
                {
                    if (model == null || model.IsDeleted == true)
                    {
                        return BadRequest("Dữ liệu không tồn tại");
                    }
                    else if (model.Id == Guid.Empty)
                    {
                        return BadRequest("Bãi đậu xe không tồn tại");
                    }
                }
                var update = _context.Parkings.Find(model.Id);
                    update.ParkingCode = model.ParkingCode;
                    update.Name = model.Name;
                    update.ZipCode = model.ZipCode;
                    update.Image = model.Image;
                    update.TotalSlots = model.TotalSlots;
                    update.Description = model.Description;
                    update.OpenTime = model.OpenTime;
                    update.CloseTime = model.CloseTime;
                    update.UpdateBy = "Nguyen Phat";
                    update.UpdateDate = DateTime.Now;   
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
                var delete = _context.Parkings.Find(id);
                if (delete == null || delete.IsDeleted == true)
                {
                    return NotFound("Không tìm thấy sản phẩm");
                }
                else
                {
                    delete.IsDeleted = true;
                    delete.DeleteBy = "Nguyen Phat";
                    delete.DeleteDate = DateTime.Now;
                }
                //_context.Parkings.Remove(delete);
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
