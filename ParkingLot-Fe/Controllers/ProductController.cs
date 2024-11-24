using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ParkingLot_Fe.Models;
using System.Text;
using MODELS.DANHMUC;
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
            List<MODELProduct> productsList = new List<MODELProduct>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetAll").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                productsList = JsonConvert.DeserializeObject<List<MODELProduct>>(data);
            }
            return View(productsList);
        }
        #endregion

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
        public IActionResult Post(MODELProduct model)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

                HttpResponseMessage response;

                if (model.Id == Guid.Empty || model.Id == null) // Kiểm tra nếu là Create
                {
                    response = _client.PostAsync(_client.BaseAddress + "/product/Post", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        TempData["successMessage"] = "Thêm sản phẩm thành công";
                        return RedirectToAction("Index");
                    }
                }
                else // Nếu có Id, thực hiện Update
                {
                    string endpoint = $"/product/Put/{model.Id}";
                    response = _client.PutAsync(_client.BaseAddress + endpoint, content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        TempData["successMessage"] = "Chỉnh sửa sản phẩm thành công";
                        return RedirectToAction("Index");
                    }
                }

                // Xử lý khi không thành công
                TempData["errorMessage"] = "Yêu cầu không thành công. Vui lòng kiểm tra lại!";
                return View(model);
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View(model);
            }
        }

        //#region CREATE
        //[HttpPost]
        //public IActionResult Post(MODELProduct model)
        //{
        //    try
        //    {
        //        string data = JsonConvert.SerializeObject(model);
        //        StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
        //        HttpResponseMessage response = _client.PostAsync(_client.BaseAddress + "/product/Post", content).Result;
        //        if (response.IsSuccessStatusCode)
        //        {
        //            TempData["successMessage"] = "Thêm sản phẩm thành công";
        //            return RedirectToAction("Index");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TempData["errorMessage"] = ex.Message;
        //        return View();
        //    }
        //    return View();
        //}
        //#endregion

        //#region UPDATE

        //[HttpPost]
        //public IActionResult Update(MODELProduct model)
        //{
        //    try
        //    {
        //        string endpoint = $"/product/Put/{model.Id}"; // Thêm {id} vào URL
        //        string data = JsonConvert.SerializeObject(model);
        //        StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

        //        HttpResponseMessage response = _client.PutAsync(_client.BaseAddress + endpoint, content).Result;

        //        if (response.IsSuccessStatusCode)
        //        {
        //            TempData["successMessage"] = "Chỉnh sửa sản phẩm thành công";
        //            return RedirectToAction("Index");
        //        }

        //        return View();
        //    }
        //    catch (Exception ex)
        //    {
        //        TempData["errorMessage"] = ex.Message;
        //        return View();
        //    }
        //}
        //#endregion

        #region DELETE
        [HttpGet]
        public IActionResult Delete(Guid id)
        {
            try
            {
                MODELProduct product = new MODELProduct();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/product/GetById/" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<MODELProduct>(data);
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
