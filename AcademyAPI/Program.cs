using AcademyAPI.Models;
using AcademyAPI.Models.Users;
using AcademyAPI.Repositories.Implementations;
using AcademyAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
using System.Text;

    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddDbContext<AcademyDbContext>(
        o => o.UseSqlServer(builder.Configuration.GetConnectionString("AcademyApp")));

    builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AcademyDbContext>()
            .AddDefaultTokenProviders();

builder.Services.AddControllers();
    builder.Services.AddScoped<IAuthService, AuthService>();

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
       
    }).AddJwtBearer(o =>
    {
        //For development
        o.RequireHttpsMetadata = false;
        o.SaveToken = true;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:SecretKey"])),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JwtSettings:Audience"]

        };
    }).AddGoogle(options =>
        {
            options.ClientId = "YourGoogleClientId";
            options.ClientSecret = "YourGoogleClientSecret";
        });


    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("RequireLoggedIn", policy => policy.RequireRole("User", "Admin"));
    });

    builder.Services.AddHealthChecks();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
/* builder.Services.AddSwaggerGen();*/

    builder.Services.AddSwaggerGen(c => {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Dance Academy Dashboard",
            Version = "v1"
        });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer jhfdkj.jkdsakjdsa.jkdsajk\"",
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    });


    builder.Services.AddCors((options) =>
        {
            options.AddPolicy("default", (options) =>
            {
                options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
            });
        });

    // Configure Stripe
    /*StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];*/

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    //Change to !app.Environment.IsDev for pushing on server
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();
    app.UseCors("default");
    app.MapControllers();

    app.Run();
