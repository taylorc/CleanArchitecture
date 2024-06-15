using System.Security.Claims;
using CleanArchitecture.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace CleanArchitecture.Infrastructure.Services;

public class CurrentUser : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? Id => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
}
