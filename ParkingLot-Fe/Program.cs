using Microsoft.AspNetCore.Identity;
using MODELS.TAIKHOAN;
using Microsoft.EntityFrameworkCore;
using System.Net;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


//app.UseStatusCodePages(async context =>
//{
//    var response = context.HttpContext.Response;

//    if (response.StatusCode == (int)HttpStatusCode.Unauthorized)
//        response.Redirect("/Website/Index");
//});

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();





app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.UseEndpoints(endpoints =>
{
    //// Route cho Admin
    //endpoints.MapControllerRoute(
    //    name: "Admin",
    //    pattern: "admin/{controller=Admin}/{action=Index}/{id?}");

    // Route mặc định
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Admin}/{action=Index}/{id?}");
});


app.Run();
