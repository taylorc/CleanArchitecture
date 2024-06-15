using Ardalis.GuardClauses;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Infrastructure.Data;
using CleanArchitecture.Infrastructure.Data.Interceptors;
using DatabaseManager;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
builder.Services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
{
    options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

#if (UseSQLite)
            options.UseSqlite(connectionString);
#else
    options.UseSqlServer(connectionString, s=>s.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));
#endif
});

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(ApplicationDbContextInitialiser.ActivitySourceName));

builder.Services.AddScoped<ApplicationDbContextInitialiser>();
builder.Services.AddHostedService(sp => {
    var scope = sp.CreateScope();
    return scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();

});
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseInitializerHealthCheck>("DbInitializer", null);

var app = builder.Build();

app.MapDefaultEndpoints();

await app.RunAsync();
