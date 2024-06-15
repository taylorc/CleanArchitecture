using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var applicationDb = builder.AddSqlServerContainer("dblayer")
    .AddDatabase("infrastructure");

builder.AddProject<Projects.Web>("web")
    .WithReference(applicationDb);

builder.AddProject<Projects.DatabaseManager>("databasemanager");

builder.Build().Run();
