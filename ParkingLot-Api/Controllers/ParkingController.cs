﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MODELS.BASE;
using MODELS;
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
                var obj = _context.Parkings
                    .Where(p => p.IsDeleted == false && p.IsActive == true) // Chỉ lấy những bản ghi có IsDelete == false
                    .ToList();

                if (obj.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }

                return Ok(obj);
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
                var obj = _context.Parkings.Find(id);
                if (obj == null || obj.IsDeleted == true || obj.IsActive == false)
                {
                    return NotFound($"Không tìm thấy bãi đậu xe có mã {obj.ParkingCode}");
                }
                return Ok(obj);
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
                // Validate model bằng FluentValidation
                var validator = new MODELParkingValidator();
                var validationResult = validator.Validate(model);
                if (!validationResult.IsValid)
                {
                    return BadRequest(validationResult.Errors);  // Trả về lỗi nếu validation không hợp lệ
                }

                // Thực hiện các bước tạo mới khi validate thành công
                if (model.Id == Guid.Empty)
                {
                    model.Id = Guid.NewGuid();
                }
                model.CreateBy = "Nguyen Phat";
                model.CreateDate = DateTime.Now;
                model.UpdateBy = "Nguyen Phat";
                model.UpdateDate = DateTime.Now;
                model.IsDeleted = false;
                model.IsActive = true;

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
        public IActionResult Put(MODELParking request)
        {
            try
            {
                if (request == null || request.Id == Guid.Empty)
                {
                    if (request == null || request.IsDeleted == true)
                    {
                        return BadRequest("Dữ liệu không tồn tại");
                    }
                    else if (request.Id == Guid.Empty)
                    {
                        return BadRequest("Bãi đậu xe không tồn tại");
                    }
                }
                var update = _context.Parkings.Find(request.Id);
                    update.ParkingCode = request.ParkingCode;
                    update.Name = request.Name;
                    update.ZipCode = request.ZipCode;
                    update.Image = request.Image;
                    update.TotalSlots = request.TotalSlots;
                    update.Description = request.Description;
                    update.OpenTime = request.OpenTime;
                    update.CloseTime = request.CloseTime;
                    update.UpdateBy = "Nguyen Phat";
                    update.UpdateDate = DateTime.Now;   
                _context.SaveChanges();
                    return Ok(request);
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
                    return NotFound("Không tìm thấy bãi đậu xe");
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

        [HttpGet("GetForComboBox")]
        public IActionResult GetForComboBox()
        {
            try
            {
                var comboBoxData = _context.Parkings
                    .Where(p => p.IsDeleted == false && p.IsActive == true)
                    .Select(p => new
                    {
                        Id = p.Id,
                        Name = p.Name // Hoặc thuộc tính bạn muốn hiển thị trong combobox
                    })
                    .ToList();

                if (comboBoxData.Count == 0)
                {
                    return NotFound("Không có dữ liệu");
                }

                return Ok(comboBoxData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public IActionResult UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file was uploaded.");
                }

                // Định nghĩa thư mục lưu ảnh
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Tạo tên file duy nhất
                var uniqueFileName = $"{file.FileName}";

                // Đường dẫn lưu file
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Kiểm tra xem file đã tồn tại chưa
                if (System.IO.File.Exists(filePath))
                {
                    return Ok(new { FileName = uniqueFileName, Message = "File already exists, not re-uploaded." });
                }

                // Lưu file vào thư mục nếu chưa tồn tại
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                // Trả về tên file đã lưu
                return Ok(new { FileName = uniqueFileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
