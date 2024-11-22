using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ParkingLot_Fe.Models;
using System.Text;

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


        #region GETLIST
        [HttpGet]
        public IActionResult Index()
        {
            List<ProductVM> productsList = new List<ProductVM>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetAll").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                productsList = JsonConvert.DeserializeObject<List<ProductVM>>(data);
            }
            return View(productsList);
        }
        #endregion


        //[HttpGet]
        //public IActionResult Get(Guid id)
        //{
        //    try
        //    {
        //        ProductVM product = new ProductVM();
        //        HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;

        //        if (response.IsSuccessStatusCode)
        //        {
        //            string data = response.Content.ReadAsStringAsync().Result;
        //            product = JsonConvert.DeserializeObject<ProductVM>(data);
        //        }
        //        return View(product);

        //    }
        //    catch (Exception ex)
        //    {
        //        TempData["errorMessage"] = ex.Message;
        //        return View();
        //    }
        //}


        [HttpGet]
        public IActionResult Get(Guid id)
        {
            try
            {
                ProductVM product = new ProductVM();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<ProductVM>(data);
                }
                return PartialView("_ProductDetailsPartial", product); // Trả về PartialView
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message }); // Trả về lỗi nếu xảy ra vấn đề
            }
        }


        #region CREATE

        [HttpGet]
        public IActionResult Post()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Post(ProductVM model)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = _client.PostAsync(_client.BaseAddress + "/product/Post", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Thêm sản phẩm thành công";
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }
        #endregion

        #region UPDATE
        [HttpGet]
        public IActionResult Update(Guid id)
        {
            try
            {
                ProductVM product = new ProductVM();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<ProductVM>(data);
                }
                return View(product);

            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
        }
        [HttpPost]
        public IActionResult Update(ProductVM model)
        {
            try
            {
                string endpoint = $"/product/Put/{model.Id}"; // Thêm {id} vào URL
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

                HttpResponseMessage response = _client.PutAsync(_client.BaseAddress + endpoint, content).Result;

                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Chỉnh sửa sản phẩm thành công";
                    return RedirectToAction("Index");
                }

                return View();
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
        }
        #endregion

        #region DELETE
        [HttpGet]
        public IActionResult Delete(Guid id)
        {
            try
            {
                ProductVM product = new ProductVM();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<ProductVM>(data);
                    return View(product);

                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirm(Guid id)
        {
            try
            {
                HttpResponseMessage response = _client.DeleteAsync(_client.BaseAddress + "/product/Delete/" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Xóa sản phẩm thành công";
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }
        #endregion
    }
}
