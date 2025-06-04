using System.ComponentModel.DataAnnotations;

var builder = DistributedApplication.CreateBuilder(args);

var web = builder.AddProject<Projects.Web>("web");

#if (UsePostgreSQL)
var databaseName = "CleanArchitectureDb";

var postgres = builder
    .AddPostgres("postgres")
    // Set the name of the default database to auto-create on container startup.
    .WithEnvironment("POSTGRES_DB", databaseName);

var database = postgres.AddDatabase(databaseName);

builderBase
    .WithReference(database)
    .WaitFor(database);
#elif (UseSqlite)
builderBase;
#else
var sql = builder.AddSqlServer("sql");

var database = sql.AddDatabase("CleanArchitectureDb");

web
    .WithReference(database)
    .WaitFor(database);
#endif

// #if(UseNuxt)

   builder.AddPnpmApp("WebApp", "../WebApp", "dev")
        .WithHttpsEndpoint(env: "PORT")
        .WithExternalHttpEndpoints()
        .WithNpmPackageInstallation()
        .WithReference(web)
        .WaitFor(web)
        .WithEnvironment("ApiUrl", web.GetEndpoint("https"))
        //.WithEnvironmentPrefix("NUXT_PUBLIC_")
        .RunWithHttpsDevCertificate("CERT_PATH", "CERT_KEY_PATH");
// #endif

builder.Build().Run();
