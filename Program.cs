using MarkaSkor.Entities;
using MarkaSkor.Services;
using Microsoft.AspNetCore.CookiePolicy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<MarkaSkorContext>();

builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "MarkaSkor",
        policy =>
        {
            policy.WithOrigins("https://localhost:44434")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
/*
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Strict;
    options.HttpOnly = HttpOnlyPolicy.None; // Adjust this as needed
    options.Secure = CookieSecurePolicy.Always; // For HTTPS connections
});
*/

builder.Services.AddScoped<IUtilityService, UtilityService>();
builder.Services.AddScoped<IJwtService, JwtService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("MarkaSkor");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
