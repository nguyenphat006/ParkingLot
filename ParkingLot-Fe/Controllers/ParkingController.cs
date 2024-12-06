using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MODELS.DANHMUC;
using MODELS.NGHIEPVU;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace ParkingLot_Fe.Controllers
{
    public class ParkingController : Controller
    {
        Uri baseAddress = new Uri("https://localhost:7167/api");
        private readonly HttpClient _client;

        public ParkingController()
        {
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }
        [HttpGet]
        public IActionResult Index()
        {
            List<MODELParking> parkinglist = new List<MODELParking>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetAll").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                parkinglist = JsonConvert.DeserializeObject<List<MODELParking>>(data);

                // Tạo URL đầy đủ cho hình ảnh
                string imageBaseUrl = "https://localhost:7167/uploads";
                foreach (var item in parkinglist)
                {
                    if (!string.IsNullOrEmpty(item.Image))
                    {
                        item.Image = $"{imageBaseUrl}/{item.Image}";
                    }
                }
            }
            return View(parkinglist);
        }

        [HttpGet]
        public IActionResult ShowViewPopup(Guid id)
        {
            try
            {
                ViewBag.StatusList = new List<SelectListItem>
                {
                    new SelectListItem { Text = "Hoạt động", Value = "true" },
                    new SelectListItem { Text = "Không hoạt động", Value = "false" }
                };
                MODELParking obj = new MODELParking();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    obj = JsonConvert.DeserializeObject<MODELParking>(data);
                }
                return PartialView("~/Views/Parking/PopupView.cshtml", obj); // Trả về PartialView
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return PartialView("_ErrorModal"); // Trả về modal lỗi nếu có
            }
        }

        [HttpGet]
        public IActionResult ShowInsertPopup()
        {
            ViewBag.StatusList = new List<SelectListItem>
            {
                new SelectListItem { Text = "Hoạt động", Value = "true" },
                new SelectListItem { Text = "Không hoạt động", Value = "false" }
            };

            var model = new MODELParking(); // Model mới để thêm sản phẩm
            return PartialView("~/Views/Parking/PopupDetail.cshtml", model);
        }

        [HttpGet]
        public IActionResult ShowUpdatePopup(Guid id)
        {
            try
            {
                ViewBag.StatusList = new List<SelectListItem>
                {
                    new SelectListItem { Text = "Hoạt động", Value = "true" },
                    new SelectListItem { Text = "Không hoạt động", Value = "false" }
                };
                MODELParking obj = new MODELParking();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    obj = JsonConvert.DeserializeObject<MODELParking>(data);
                }

                // Trả về PartialView thay vì View
                return PartialView("~/Views/Parking/PopupEdit.cshtml", obj);
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;

                // Trả về PartialView rỗng để tránh lỗi modal
                return PartialView("~/Views/Parking/PopupDetail.cshtml");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] MODELParking model)
        {
            try
            {
                if (model == null)
                {
                    // Trường hợp model bị null hoặc không hợp lệ
                    return Json(new { success = false, message = "Dữ liệu không hợp lệ." });
                }

                // Kiểm tra tính hợp lệ của ModelState
                if (!ModelState.IsValid)
                {
                    // Trả về danh sách lỗi từ ModelState
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();

                    return Json(new { success = false, message = "Dữ liệu không hợp lệ.", errors });
                }
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

                HttpResponseMessage response;

                if (model.Id == Guid.Empty || model.Id == null) // Tạo mới
                {
                    response = _client.PostAsync(_client.BaseAddress + "/parking/Post", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, data = false, message = "Thêm bãi đậu xe thành công!" });
                    }
                }
                else // Cập nhật
                {
                    string endpoint = $"/parking/Put/{model.Id}";
                    response = _client.PutAsync(_client.BaseAddress + endpoint, content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, data = true, message = "Chỉnh sửa bãi đậu xe thành công!" });
                    }
                }

                // Nếu phản hồi không thành công
                string errorDetails = response?.Content.ReadAsStringAsync().Result ?? "Không rõ lý do.";
                return Json(new { success = false, message = $"Yêu cầu không thành công: {errorDetails}" });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về phản hồi phù hợp
                return Json(new { success = false, message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            try
            {
                // Gửi yêu cầu đến API để xóa sản phẩm
                HttpResponseMessage response = _client.DeleteAsync(_client.BaseAddress + "/parking/Delete/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    return Json(new { success = true, message = "Xóa bãi đậu xe thành công!" });
                }
                else
                {
                    // Đọc thông báo lỗi từ API nếu có
                    string errorDetails = response.Content.ReadAsStringAsync().Result;
                    return Json(new { success = false, message = $"Xóa không thành công: {errorDetails}" });
                }
            }
            catch (Exception ex)
            {
                // Trả về thông báo lỗi nếu xảy ra ngoại lệ
                return Json(new { success = false, message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }

        [HttpPost]
        public IActionResult UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return Json(new { success = false, message = "File không hợp lệ." });
                }

                // Tạo MultipartFormDataContent để gửi dữ liệu
                var content = new MultipartFormDataContent();

                // Đọc toàn bộ nội dung file vào một mảng byte
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream); // Copy nội dung file vào memoryStream
                    var fileContent = new ByteArrayContent(memoryStream.ToArray());
                    fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                    content.Add(fileContent, "file", file.FileName);
                }

                // Gửi request tới API UploadImage
                HttpResponseMessage response = _client.PostAsync(_client.BaseAddress + "/parking/UploadImage", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    // Lấy tên file trả về từ API
                    var result = response.Content.ReadAsStringAsync().Result;
                    return Json(new { success = true, data = result, message = "Upload ảnh thành công!" });
                }

                // Nếu phản hồi không thành công
                string errorDetails = response.Content.ReadAsStringAsync().Result ?? "Không rõ lý do.";
                return Json(new { success = false, message = $"Upload ảnh thất bại: {errorDetails}" });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về phản hồi phù hợp
                return Json(new { success = false, message = $"Đã xảy ra lỗi: {ex.Message}" });
            }
        }

    }

}

