﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ParkingLot_Fe.Models;
using System.Text;
using MODELS.DANHMUC;
using MODELS.BASE;
using MODELS.NGHIEPVU;
namespace ParkingLot_Fe.Controllers
{
    public class ProductController : Controller
    {
        Uri baseAddress = new Uri("https://localhost:7167/api");
        private readonly HttpClient _client;
        public ProductController()
        {
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<MODELProduct> productsList = new List<MODELProduct>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetAll").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                productsList = JsonConvert.DeserializeObject<List<MODELProduct>>(data);
            }
            return View(productsList);
        }
        
        [HttpGet]
        public IActionResult ShowViewPopup(Guid id)
        {
            try
            {
                MODELProduct obj = new MODELProduct();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    obj = JsonConvert.DeserializeObject<MODELProduct>(data);
                }
                return PartialView("~/Views/Product/PopupView.cshtml", obj); // Trả về PartialView
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
            var model = new MODELProduct(); // Model mới để thêm sản phẩm
            return PartialView("~/Views/Product/PopupDetail.cshtml", model);
        }

        [HttpGet]
        public IActionResult ShowUpdatePopup(Guid id)
        {
            try
            {
                MODELProduct obj = new MODELProduct();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    obj = JsonConvert.DeserializeObject<MODELProduct>(data);
                }

                // Trả về PartialView thay vì View
                return PartialView("~/Views/Product/PopupDetail.cshtml", obj);
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;

                // Trả về PartialView rỗng để tránh lỗi modal
                return PartialView("~/Views/Product/PopupDetail.cshtml");
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] MODELProduct model)
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
                    response = _client.PostAsync(_client.BaseAddress + "/product/Post", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, data = false, message = "Thêm sản phẩm thành công!" });
                    }
                }
                else // Cập nhật
                {
                    string endpoint = $"/product/Put/{model.Id}";
                    response = _client.PutAsync(_client.BaseAddress + endpoint, content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, data = true, message = "Chỉnh sửa sản phẩm thành công!" });
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
                HttpResponseMessage response = _client.DeleteAsync(_client.BaseAddress + "/product/Delete/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    return Json(new { success = true, message = "Xóa sản phẩm thành công!" });
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


        //[HttpGet]
        //public IActionResult GetComboBox()
        //{
        //    List<MODELParking> parkingList = new List<MODELParking>();
        //    HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetForComboBox").Result;

        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        parkingList = JsonConvert.DeserializeObject<List<MODELParking>>(data);
        //    }

        //    return View(parkingList);
        //}


        [HttpGet]
        public IActionResult GetForComboBox()
        {
            try
            {
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/parking/GetForComboBox").Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;

                    // Deserialize dữ liệu thành danh sách các item combobox
                    var comboBoxData = JsonConvert.DeserializeObject<List<dynamic>>(data);

                    // Truyền dữ liệu vào ViewBag
                    ViewBag.ParkingCombobox = comboBoxData;
                }
                else
                {
                    ViewBag.ParkingCombobox = new List<dynamic>();
                }
            }
            catch (Exception)
            {
                ViewBag.ParkingCombobox = new List<dynamic>();
            }

            return View();
        }



    }
}
