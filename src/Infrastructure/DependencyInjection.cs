using Ardalis.GuardClauses;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Constants;
using CleanArchitecture.Infrastructure.Data;
using CleanArchitecture.Infrastructure.Data.Interceptors;
using CleanArchitecture.Infrastructure.Identity;
using CleanArchitecture.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        

        services.AddScoped<IUser, CurrentUser>();

        services.AddHttpContextAccessor();

//        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
//        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

//        services.AddDbContext<ApplicationDbContext>((sp, options) =>
//        {
//            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

//#if (UseSQLite)
//            options.UseSqlite(connectionString);
//#else
//            options.UseSqlServer(connectionString);
//#endif
//        });

//        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());


#if (UseApiOnly)
        services.AddAuthentication()
            .AddBearerToken(IdentityConstants.BearerScheme);

        services.AddAuthorizationBuilder();

        services
            .AddIdentityCore<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddApiEndpoints();
#else
        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();
#endif

        services.AddSingleton(TimeProvider.System);
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddAuthorization(options =>
            options.AddPolicy(Policies.CanPurge, policy => policy.RequireRole(Roles.Administrator)));

        return services;
    }
}
