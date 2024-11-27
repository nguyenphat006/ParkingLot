using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MODELS.NGHIEPVU;
using ParkingLot_Api.Entities;

namespace ParkingLot_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SlotController : ControllerBase
    {
        private readonly MyDbContext _context;
        public SlotController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var slots = _context.Slots
                .Where(p => p.IsDeleted == false) // Chỉ lấy những bản ghi có IsDelete == false
                .ToList();
                if (slots.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }
                return Ok(slots);
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
                var slots = _context.Slots.Find(id);
                if (slots == null || slots.IsDeleted == true)
                {
                    return NotFound($"Không tìm thấy slot có id {id}");
                }
                return Ok(slots);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post(Slot model)
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
                _context.Slots.Add(model);
                _context.SaveChanges();
                return Ok("Slot đã được tạo");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(MODELSlot model)
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
                        return BadRequest("Slot không tồn tại");
                    }
                }
                var update = _context.Slots.Find(model.Id);
                update.ParkingId = model.ParkingId;
                update.SlotCode = model.SlotCode;
                update.Status = model.Status;
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
                var delete = _context.Slots.Find(id);
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
