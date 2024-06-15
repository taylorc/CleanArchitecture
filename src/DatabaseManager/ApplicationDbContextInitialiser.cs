using System.Diagnostics;
using CleanArchitecture.Domain.Constants;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Infrastructure.Data;


public class ApplicationDbContextInitialiser : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(IServiceProvider serviceProvider, ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public const string ActivitySourceName = "Migrations";

    private readonly ActivitySource _activitySource = new(ActivitySourceName);

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await InitialiseDatabaseAsync(_serviceProvider);
    }

    public async Task InitialiseDatabaseAsync(IServiceProvider serviceProvider)
    {
        using var activity = _activitySource.StartActivity("Initializing catalog database", ActivityKind.Client);

        var sw = Stopwatch.StartNew();

        await InitialiseAsync();

        await SeedAsync();

        _logger.LogInformation("Database initialization completed after {ElapsedMilliseconds}ms", sw.ElapsedMilliseconds);
    }

    public async Task InitialiseAsync()
    {
        try
        {

            await _context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        var administratorRole = new IdentityRole(Roles.Administrator);

        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        // Default users
        var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new [] { administratorRole.Name });
            }
        }

        // Default data
        // Seed, if necessary
        if (!_context.TodoLists.Any())
        {
            _context.TodoLists.Add(new TodoList
            {
                Title = "Todo List",
                Items =
                {
                    new TodoItem { Title = "Make a todo list 📃" },
                    new TodoItem { Title = "Check off the first item ✅" },
                    new TodoItem { Title = "Realise you've already done two things on the list! 🤯"},
                    new TodoItem { Title = "Reward yourself with a nice, long nap 🏆" },
                }
            });

            await _context.SaveChangesAsync();
        }
    }
}
