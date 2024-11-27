using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MODELS.NGHIEPVU;
using ParkingLot_Api.Entities;

namespace ParkingLot_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ParkingSlotController : ControllerBase
    {
        private readonly MyDbContext _context;
        public ParkingSlotController(MyDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                // Lấy danh sách các Parking mà IsDelete == false
                var parkingslot = _context.ParkingSlots
                    .Where(p => p.IsDeleted == false) // Chỉ lấy những bản ghi có IsDelete == false
                    .ToList();

                if (parkingslot.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }

                return Ok(parkingslot);
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
                var parkingslot = _context.ParkingSlots.Find(id);
                if (parkingslot == null || parkingslot.IsDeleted == true)
                {
                    return NotFound($"Không tìm thấy ParkingSlot");
                }
                return Ok(parkingslot);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post(ParkingSlot model)
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
                model.IsDeleted = false;
                _context.ParkingSlots.Add(model);
                _context.SaveChanges();
                return Ok("Đã được tạo");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(MODELParkingSlot model)
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
                var update = _context.ParkingSlots.Find(model.Id);
                update.ParkingId = model.ParkingId;
                update.SlotId = model.SlotId;
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
                var delete = _context.ParkingSlots.Find(id);
                if (delete == null || delete.IsDeleted == true)
                {
                    return NotFound("Không tìm thấy");
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
