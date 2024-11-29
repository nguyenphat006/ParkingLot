using Microsoft.AspNetCore.Mvc;
using MODELS.DANHMUC;
using MODELS.NGHIEPVU;
using Newtonsoft.Json;
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
            }
            return View(parkinglist);
        }

        [HttpGet]
        public IActionResult ShowViewPopup(Guid id)
        {
            try
            {
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
            var model = new MODELParking(); // Model mới để thêm sản phẩm
            return PartialView("~/Views/Parking/PopupDetail.cshtml", model);
        }

        [HttpGet]
        public IActionResult ShowUpdatePopup(Guid id)
        {
            try
            {
                MODELParking obj = new MODELParking();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    obj = JsonConvert.DeserializeObject<MODELParking>(data);
                }

                // Trả về PartialView thay vì View
                return PartialView("~/Views/Parking/PopupDetail.cshtml", obj);
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
    }
}
