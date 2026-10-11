// Content extracted verbatim from the `Learning Roadmap.dc.html` design source.

const PHASES = [
    { num: 0, title: 'Environment setup', weeks: 'Week 1',
      blurb: 'Get to the point where the whole system runs on your machine.',
      steps: [
        'Install the .NET 9 SDK (confirm with dotnet --version)',
        'Pick an IDE for macOS: JetBrains Rider (best ABP experience) or VS Code + C# Dev Kit',
        'Install Docker Desktop; run startup-docker-images/start-docker-images.ps1 (brew install powershell) to bring up SQL Server, Kafka, Keycloak, Redis',
        'Install a SQL client: Azure Data Studio, or Rider\u2019s database tools',
        'Install the ABP CLI: dotnet tool install -g Volo.Abp.Studio.Cli',
        'Get access to the private NuGet feed hosting UVP.Shared.* plus the ABP commercial license \u2014 nothing builds without it',
        'Start services with dev-runner: node dev-runner/run.mjs --list, then run Membership + APIGateway',
        'Open Keycloak (localhost:8080, realm uvp), a service\u2019s Swagger UI and Kafka UI \u2014 just look around'
      ],
      practice: 'Point ClientApp at your local gateway and click through a flow you know well.',
      milestone: 'ClientApp running against your locally-running gateway and at least one service.' },

    { num: 1, title: 'C# language fundamentals', weeks: 'Weeks 2\u20137',
      blurb: 'The single biggest investment. Don\u2019t rush it \u2014 everything else sits on top.',
      steps: [
        'Syntax & types: value vs reference types, string, arrays, var, namespaces \u2014 map each to its TypeScript cousin',
        'OOP: classes, properties (get; set;), constructors, inheritance, interfaces, abstract classes, access modifiers, static',
        'Collections & generics: List<T>, Dictionary<K,V>, IEnumerable<T>, generic methods and classes',
        'LINQ \u2014 critical; it is how all data access reads in this codebase (Where, Select, FirstOrDefault, Any, GroupBy)',
        'async/await and Task<T> \u2014 critical; every app service method in the repos is async (Task \u2248 Promise)',
        'Delegates, lambdas, events, Action/Func',
        'Exceptions and try/catch/finally',
        'Modern C#: nullable reference types, records, pattern matching, expression-bodied members, extension methods, tuples',
        'Projects & packages: what a .csproj is, NuGet, dotnet build/run/test'
      ],
      practice: 'A console app \u2014 a small volunteer-registration manager: CRUD over an in-memory list, LINQ filtering, JSON persistence, async file I/O.',
      milestone: 'You can read any file in a *.Domain or *.Application project and follow the syntax (not yet the framework magic).' },

    { num: 2, title: 'ASP.NET Core Web API', weeks: 'Weeks 8\u201312',
      blurb: 'Plain ASP.NET Core first, without ABP \u2014 otherwise you can\u2019t tell which magic is the framework and which is ABP.',
      steps: [
        'Program.cs, the host, and the middleware pipeline (compare to Angular interceptors)',
        'Dependency injection: transient/scoped/singleton lifetimes, constructor injection',
        'Controllers, routing, model binding, [ApiController], action results, status codes',
        'Configuration: appsettings.json, environments, the options pattern (IOptions<T>)',
        'HttpClient + typed clients, and what Microsoft.Extensions.Http.Polly adds (retries, circuit breakers)',
        'Logging abstractions (ILogger<T>) and how Serilog plugs in',
        'Middleware, filters, exception handling',
        'Swagger / Swashbuckle \u2014 generate and read your own API docs',
        'Health checks (the repos expose them with the HealthChecks UI)'
      ],
      practice: 'Rebuild your Phase 1 console domain as a Web API with DI-registered services, Swagger, Serilog and a health endpoint \u2014 then call it from a scratch Angular page.',
      milestone: 'You can open any *.HttpApi.Host Program.cs / module class and roughly follow what it wires up.' },

    { num: 3, title: 'SQL Server & Entity Framework Core', weeks: 'Weeks 13\u201317',
      blurb: 'SQL first (~1.5 weeks), then EF Core 9 (~3.5 weeks).',
      steps: [
        'T-SQL: SELECT / JOIN / GROUP BY, INSERT-UPDATE-DELETE, keys and constraints',
        'Indexes (what they are, when queries get slow) and transactions',
        'Poke around a real service database in the Docker SQL Server with Azure Data Studio',
        'DbContext, DbSet<T>, entity configuration with the Fluent API (as used in *.EntityFrameworkCore)',
        'Querying with LINQ, how it translates to SQL, Include for related data',
        'Change tracking, SaveChanges, AsNoTracking',
        'Relationships: one-to-many, many-to-many, owned types',
        'Migrations: dotnet ef migrations add / database update \u2014 then study how the repos do it via DbMigrator console apps (run one!)',
        'Performance basics: N+1 queries, projection with Select, split queries',
        'Testing with the InMemory provider (as the repos\u2019 *.EntityFrameworkCore.Tests do)'
      ],
      practice: 'Add SQL Server + EF Core persistence with migrations to your Phase 2 API, then read MembershipService\u2019s EntityFrameworkCore + DbMigrator projects end to end.',
      milestone: 'You can add a column to an entity in a sandbox copy, create the migration and run the DbMigrator.' },

    { num: 4, title: 'ABP Framework & DDD', weeks: 'Weeks 18\u201324',
      blurb: 'The heart of this codebase: DDD concepts for a week, then ABP 9.3 itself for five.',
      steps: [
        'DDD lite: entities, aggregate roots, value objects, domain vs application services, repositories, DTOs, why layers exist',
        'Module system: [DependsOn], AbpModule, ConfigureServices \u2014 every project has a module class',
        'The layered template \u2014 map each concept onto the repo layout',
        'Application services & DTOs: ApplicationService, CrudAppService, auto API controllers (why *.HttpApi controllers are so thin)',
        'Repositories: IRepository<TEntity, TKey>, custom repositories, specifications',
        'Object mapping with Volo.Abp.AutoMapper (see the profiles in *.Application)',
        'Authorization: permission definitions, [Authorize], permission management \u2014 what drives the checks you see in Angular',
        'Settings, feature management, global features',
        'Multi-tenancy: ICurrentTenant and data filters \u2014 the gateway and services are tenant-aware',
        'Audit logging (UVP.Shared.AuditLog builds on ABP\u2019s)',
        'Background jobs & workers: ABP abstractions + the Hangfire integration and BackgroundJobs.Host projects',
        'Event bus: local vs distributed (Kafka here) \u2014 IDistributedEventBus, ETOs',
        'Volo.FileManagement module (upload/storage used by many services)',
        'FluentValidation for DTO validation; Scriban for text/email templates',
        'ABP CLI: connect the dots to abp generate-proxy \u2014 backend API definition \u2192 your Angular proxies',
        'Do ABP\u2019s BookStore tutorial (Angular UI) from scratch, then read one small real service end-to-end (IdeasBank or Collaboration)'
      ],
      practice: 'Trace one feature you know from the frontend \u2014 e.g. an opportunity enrollment \u2014 across HttpApi \u2192 Application \u2192 Domain \u2192 EF Core \u2192 database.',
      milestone: 'Given a feature request, you can say which layer of which service each change belongs in.' },

    { num: 5, title: 'Microservices infrastructure', weeks: 'Weeks 25\u201330',
      blurb: 'How the 16 services talk to each other and to the outside world.',
      steps: [
        'OAuth2 / OpenID Connect & JWT (1.5 wks): auth code + PKCE, access vs refresh tokens, claims, scopes \u2014 then Keycloak realms, clients, roles, the uvp realm, AddJwtBearer',
        'YARP gateway (0.5 wk): read UVP.WebGateway\u2019s routes and clusters \u2014 why ClientApp talks to one origin but reaches 16 services',
        'Kafka (1.5 wks): topics, partitions, consumer groups, offsets, delivery guarantees \u2014 then Volo.Abp.EventBus.Kafka + UVP.Shared.Kafka; watch real events in Kafka UI',
        'Redis (0.5 wk): data types, TTLs \u2014 then its three roles here: distributed cache, DistributedLock.Redis, DataProtection key sharing',
        'Resilience & cross-service calls (0.5 wk): Polly retries and circuit breakers, *.HttpApi.Client projects, ABP dynamic HTTP client proxies',
        'MediatR / CQRS (0.5 wk): commands, queries, handlers, pipeline behaviours \u2014 find where the repos use MediatR vs plain app services',
        'Observability (1 wk): Serilog structured logging, Prometheus metrics, Health Checks UI, Elastic APM \u2014 trace one request across gateway \u2192 service \u2192 Kafka \u2192 service'
      ],
      practice: 'Follow one click in ClientApp through the Kafka UI and the logs of two services at once.',
      milestone: 'You can explain the full journey of one user action: Angular \u2192 Keycloak token \u2192 YARP \u2192 service A \u2192 Kafka event \u2192 service B \u2192 SQL.' },

    { num: 6, title: 'Testing & professional practice', weeks: 'Weeks 31\u201334',
      blurb: 'Match the way the repos already test.',
      steps: [
        'xUnit: facts, theories, fixtures, test lifecycle',
        'Mocking with Moq and NSubstitute (both are used \u2014 read a few tests of each style), assertions with Shouldly',
        'ABP\u2019s TestBase projects: how they spin up modules on the EF InMemory provider so Application.Tests run without a real DB',
        'What to test at which layer: Domain.Tests (pure logic) vs Application.Tests (orchestration) vs EntityFrameworkCore.Tests (queries/mappings)',
        'Debugging across services in Rider/VS Code \u2014 breakpoints in two services at once via dev-runner'
      ],
      practice: 'Pick an existing app service with thin coverage, write 3\u20135 new tests, run the whole suite with dotnet test.',
      milestone: 'You can write tests for a new app service method without copying an existing test blindly.' },

    { num: 7, title: 'Working on the real codebase', weeks: 'From ~Week 28 (overlaps 5\u20136)',
      blurb: 'Graduated real tasks \u2014 ask your team for backend tickets in this order of difficulty.',
      steps: [
        'Read-only change: add a field to an existing DTO/response, then regenerate the Angular proxy yourself',
        'Full vertical slice: new column on an entity \u2192 EF migration via DbMigrator \u2192 DTO \u2192 app service \u2192 permission check \u2192 proxy \u2192 Angular UI',
        'New endpoint: new app service method + authorization + FluentValidation + tests',
        'Async work: publish a distributed event from one service and handle it in another, or add a Hangfire background job',
        'A real bug in any service, found and fixed by you, with a test'
      ],
      practice: 'Keep a short log of each ticket: which layers you touched and what surprised you.',
      milestone: 'Full-stack ready \u2014 you\u2019ve shipped a vertical-slice feature and one cross-service (Kafka) change to a real environment.' }
  ];

const RESOURCES = [
    { phase: 0, topic: 'Docker', title: 'Docker Tutorial for Beginners', author: 'TechWorld with Nana', cost: 'Free', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', note: '~3h on concepts, CLI, volumes and Compose \u2014 all you need to drive startup-docker-images confidently.' },
    { phase: 0, topic: 'Docker', title: 'Docker Get Started + Compose docs', author: 'Docker', cost: 'Free', url: 'https://docs.docker.com/get-started/', note: 'The official pair; skim rather than study.' },
    { phase: 0, topic: 'Docker', title: 'Docker Mastery', author: 'Bret Fisher, Udemy', cost: 'Paid ~$15\u201325 on sale', url: 'https://www.udemy.com/course/docker-mastery/', note: 'Continuously updated bestseller \u2014 skip the Swarm/K8s sections.' },

    { phase: 1, topic: 'C#', title: 'C# for Beginners Hands-On', author: 'Nick Chapsas, Dometrain', cost: 'Free', url: 'https://dometrain.com/course/hands-on-csharp-for-beginners/', note: 'Top free pick. ~21h, 219 lessons through OOP, generics, LINQ, async, HTTP, plus C# 13/14 features. Lifetime, no subscription.' },
    { phase: 1, topic: 'C#', title: 'Tips for JavaScript and TypeScript developers', author: 'Microsoft', cost: 'Free', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-javascript-developers', note: 'Side-by-side TS \u2194 C# comparisons. Read this first \u2014 it will save you days.' },
    { phase: 1, topic: 'C#', title: 'C# and .NET Basics', author: 'Spencer Schneidenbach, Master.dev', cost: 'Paid ~$39/mo sub', url: 'https://master.dev/courses/csharp-dotnet/', note: 'Master.dev priority #1. 5h48m, 4.8\u2605; reviews praise its accessibility for JavaScript developers \u2014 arguably the best-fit paid C# intro for you anywhere.' },
    { phase: 1, topic: 'C#', title: 'Ultimate C# Masterclass', author: 'Krystyna \u015alusarczyk, Udemy', cost: 'Paid ~$13\u201325 on sale', url: 'https://www.udemy.com/course/ultimate-csharp-masterclass/', note: 'Top paid pick. 48h, 67 coding exercises, 86 quizzes, 4.7\u2605 \u2014 the exercise volume is what makes a new language stick.' },
    { phase: 1, topic: 'C#', title: 'Foundational C# with Microsoft Certification', author: 'Microsoft + freeCodeCamp', cost: 'Free', url: 'https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/', note: '~35h in-browser ending in an 80-question cert \u2014 free credential; stops at fundamentals, so pair it.' },
    { phase: 1, topic: 'C#', title: 'Exercism C# track', author: 'Exercism', cost: 'Free', url: 'https://exercism.org/tracks/csharp', note: '160+ exercises with human mentoring. Best deliberate practice for un-learning JS habits \u2014 a couple per week.' },
    { phase: 1, topic: 'C#', title: 'C# 12 in a Nutshell', author: 'Joseph Albahari', cost: 'Paid ~$40\u201360', url: 'https://www.amazon.com/C-12-Nutshell-Definitive-Reference/dp/1098147448', note: 'The definitive ~1,100-page reference; the author confirmed no newer edition. Buy as a lookup companion, not a read-through.' },
    { phase: 1, topic: 'C#', title: 'Nick Chapsas on YouTube', author: 'Nick Chapsas', cost: 'Free', url: 'https://www.youtube.com/@nickchapsas', note: 'Short, current videos on modern C# idioms. Subscribe now; it pays off for years.' },

    { phase: 2, topic: 'ASP.NET Core', title: 'ASP.NET Core fundamentals learning path', author: 'Microsoft Learn', cost: 'Free', url: 'https://learn.microsoft.com/en-us/training/paths/aspnet-core-fundamentals/', note: 'Top free pick. DI, middleware, configuration, HttpClient, then controllers/routing/CRUD \u2014 exactly the Phase 2 checklist.' },
    { phase: 2, topic: 'ASP.NET Core', title: 'From Zero to Hero: REST APIs in .NET', author: 'Nick Chapsas, Dometrain', cost: 'Paid (course or sub)', url: 'https://dometrain.com/course/from-zero-to-hero-rest-apis-in-asp-net-core/', note: 'Top paid pick. 4h41m: REST design, controllers and minimal APIs, DI, Swagger, versioning, JWT, paging, caching.' },
    { phase: 2, topic: 'ASP.NET Core', title: '.NET Web API Zero to Hero', author: 'Mukesh Murugan (codewithmukesh)', cost: 'Free', url: 'https://codewithmukesh.com/courses/dotnet-webapi-zero-to-hero/', note: '151+ lessons on current .NET, verified free forever. Astonishing depth; text + code suits self-paced study.' },
    { phase: 2, topic: 'ASP.NET Core', title: 'Ultimate ASP.NET Core Web API Development Guide', author: 'Trevoir Williams, Udemy', cost: 'Paid ~$13\u201325 on sale', url: 'https://www.udemy.com/course/ultimate-aspnet-5-web-api-development-guide/', note: '19.5h, updated to .NET 9: EF Core, Identity/JWT/refresh tokens, Serilog, versioning, deployment.' },
    { phase: 2, topic: 'ASP.NET Core', title: 'Build a Robust API with ASP.NET Core', author: 'Spencer Schneidenbach, Master.dev', cost: 'Paid ~$39/mo sub', url: 'https://master.dev/courses/dotnet-apis/', note: '~5h whose syllabus overlaps ELM unusually well: middleware, FluentValidation, EF Core, Testcontainers, auth.' },
    { phase: 2, topic: 'ASP.NET Core', title: 'ASP.NET Core in Action, 3rd Ed.', author: 'Andrew Lock, Manning', cost: 'Paid ~$48\u201360', url: 'https://www.manning.com/books/asp-net-core-in-action-third-edition', note: 'Best-written book on the why of DI/middleware/config. Targets .NET 7; fundamentals unchanged \u2014 supplement with his blog.' },
    { phase: 2, topic: 'ASP.NET Core', title: 'andrewlock.net + Milan Jovanovi\u0107 YouTube', author: 'Andrew Lock / Milan Jovanovi\u0107', cost: 'Free', url: 'https://andrewlock.net/', note: 'The two best free companions: Lock for framework internals, Jovanovi\u0107 for architecture.' },

    { phase: 3, topic: 'SQL Server', title: 'Get Started Querying with Transact-SQL', author: 'Microsoft Learn', cost: 'Free', url: 'https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/', note: 'Top free pick. SELECT, JOINs, subqueries, GROUP BY, modification \u2014 in the exact dialect ELM uses, with sandboxes.' },
    { phase: 3, topic: 'SQL Server', title: 'SQLBolt', author: 'SQLBolt', cost: 'Free', url: 'https://sqlbolt.com/', note: '~20 interactive lessons \u2014 fastest way to get SQL into muscle memory in a weekend. Do it before the MS Learn path.' },
    { phase: 3, topic: 'SQL Server', title: 'T-SQL Fundamentals, 4th Edition', author: 'Itzik Ben-Gan, Microsoft Press', cost: 'Paid ~$35\u201355', url: 'https://www.microsoftpressstore.com/store/t-sql-fundamentals-9780138102104', note: 'Top paid pick. Written against SQL Server 2022 \u2014 an exact match; teaches how the engine evaluates queries.' },
    { phase: 3, topic: 'SQL Server', title: 'How to Think Like the SQL Server Engine', author: 'Brent Ozar', cost: 'Free', url: 'https://training.brentozar.com/p/how-to-think-like-the-engine', note: '~90 min on indexes and execution plans \u2014 the best bridge from writing SELECT to understanding performance.' },
    { phase: 3, topic: 'EF Core', title: 'EF Core official docs', author: 'Microsoft', cost: 'Free', url: 'https://learn.microsoft.com/en-us/ef/core/', note: 'Unusually good first-party docs \u2014 your daily reference for modelling, querying, migrations, performance and testing.' },
    { phase: 3, topic: 'EF Core', title: 'EF Core 8 Fundamentals', author: 'Julie Lerman, Pluralsight', cost: 'Paid (sub $29/mo)', url: 'https://www.pluralsight.com/courses/ef-core-8-fundamentals', note: 'Top paid pick. ~7h from the EF educator; EF 9 is incremental so ~95% transfers.' },
    { phase: 3, topic: 'EF Core', title: 'From Zero to Hero: Entity Framework Core', author: 'Hannes Lowette, Dometrain', cost: 'Paid (sub)', url: 'https://dometrain.com/course/from-zero-to-hero-entity-framework-core-in-dotnet/', note: '8.5h: Fluent API, migrations, relationships, concurrency, batching, testing. Most modern soup-to-nuts EF video.' },
    { phase: 3, topic: 'EF Core', title: 'EF Core performance guide', author: 'Milan Jovanovi\u0107', cost: 'Free', url: 'https://milanjovanovic.tech/blog/ef-core-performance-guide', note: 'EF-in-microservices patterns \u2014 multiple DbContexts, performance \u2014 directly relevant to ELM.' },

    { phase: 4, topic: 'ABP', title: 'Official ABP docs', author: 'Volosoft', cost: 'Free', url: 'https://abp.io/docs/latest', note: 'Pin the version picker to 9.3 to match ELM. Priority: modularity, DI, repositories, app services, unit of work, multi-tenancy, distributed event bus, permissions, file management.' },
    { phase: 4, topic: 'ABP', title: 'Book Store tutorial (Angular UI)', author: 'Volosoft', cost: 'Free', url: 'https://abp.io/docs/latest/tutorials/book-store', note: 'Top free pick. Layered DDD app with Angular + EF Core \u2014 literally your stack. Warm up with TodoApp if you like.' },
    { phase: 4, topic: 'ABP', title: 'Microservice Development Tutorial', author: 'Volosoft', cost: 'Included in your license', url: 'https://abp.io/docs/latest/tutorials/microservice', note: '7 parts: two services, inter-service calls, distributed events, gateway, ABP Suite CRUD. The closest thing to a guided course on ELM\u2019s architecture.' },
    { phase: 4, topic: 'ABP', title: 'Implementing Domain Driven Design (eBook)', author: 'Halil \u0130brahim Kalkan', cost: 'Free', url: 'https://abp.io/books/implementing-domain-driven-design', note: 'DDD exactly as ABP \u2014 and therefore ELM \u2014 practises it. Doubles as your first DDD read.' },
    { phase: 4, topic: 'ABP', title: 'Building Microservice Solutions (eBook) + eShopOnAbp', author: 'Volosoft', cost: 'Free', url: 'https://abp.io/books/building-microservice-solutions', note: 'Walks the open-source reference microservice solution: gateways, auth, messaging. Still draft, but the only long-form text.' },
    { phase: 4, topic: 'ABP', title: 'ABP Angular UI docs (service proxies)', author: 'Volosoft', cost: 'Free', url: 'https://abp.io/docs/latest/framework/ui/angular/service-proxies', note: 'You already consume this \u2014 reading it from the backend\u2019s side connects the dots on what generate-proxy produces.' },
    { phase: 4, topic: 'ABP', title: 'Mastering ABP Framework', author: 'Halil \u0130brahim Kalkan, Packt', cost: 'Paid ~$32\u201344', url: 'https://www.packtpub.com/en-us/product/mastering-abp-framework-9781801079242', note: 'By ABP\u2019s creator. Written against ABP 5/.NET 6 and MVC UIs \u2014 the architectural 80% still maps; ask your license admin about free promo copies.' },
    { phase: 4, topic: 'DDD', title: 'Learning Domain-Driven Design', author: 'Vlad Khononov, O\u2019Reilly', cost: 'Paid ~$40\u201356', url: 'https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/', note: 'Top paid pick. The consensus best first DDD book: bounded contexts, aggregates, event-driven integration, when not to DDD.' },
    { phase: 4, topic: 'DDD', title: '.NET Microservices Architecture \u2014 DDD & CQRS chapter', author: 'Microsoft', cost: 'Free', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/', note: 'The theory behind ABP\u2019s template and the Kafka event bus \u2014 free and .NET-official.' },
    { phase: 4, topic: 'DDD', title: 'Getting Started with DDD + Deep Dive into DDD', author: 'Amichai Mantinband, Dometrain', cost: 'Paid (sub)', url: 'https://dometrain.com/course/getting-started-domain-driven-design-ddd/', note: 'Best video-first, C#-first DDD path; his YouTube series is a zero-cost preview.' },

    { phase: 5, topic: 'OAuth / OIDC', title: 'OAuth 2.0 Simplified (oauth.com)', author: 'Aaron Parecki, Okta', cost: 'Free', url: 'https://www.oauth.com', note: 'The best readable end-to-end OAuth2 explanation, maintained by an IETF OAuth editor.' },
    { phase: 5, topic: 'OAuth / OIDC', title: 'OAuth 2.0 and OpenID Connect (in plain English)', author: 'Nate Barbettini', cost: 'Free', url: 'https://www.youtube.com/watch?v=996OiexHze0', note: 'One hour that builds the right mental model \u2014 watch before touching any config.' },
    { phase: 5, topic: 'OAuth / OIDC', title: 'Securing ASP.NET Core with OAuth2 and OIDC', author: 'Kevin Dockx, Pluralsight', cost: 'Paid (sub)', url: 'https://www.pluralsight.com/courses/securing-asp-dot-net-core-10-oauth2-openid-connect', note: 'Full OIDC flows implemented in ASP.NET Core; repo current for .NET 8/9/10.' },
    { phase: 5, topic: 'Keycloak', title: 'Keycloak official docs & guides', author: 'Keycloak', cost: 'Free', url: 'https://www.keycloak.org/guides', note: 'Start with the Docker getting-started guide, then securing-apps \u2014 version-matched to ELM\u2019s Keycloak 24+.' },
    { phase: 5, topic: 'Keycloak', title: 'Keycloak.AuthServices (.NET) docs', author: 'Oleksii Nikiforov', cost: 'Free', url: 'https://nikiforovall.github.io/keycloak-authorization-services-dotnet/', note: 'The de-facto ASP.NET Core \u2194 Keycloak packages; the docs double as a tutorial for exactly ELM\u2019s pattern.' },
    { phase: 5, topic: 'Keycloak', title: 'Keycloak \u2014 IAM for Modern Applications, 2nd Ed.', author: 'Thorgersen & Silva, Packt', cost: 'Paid ~$36\u201346', url: 'https://www.packtpub.com/en-us/product/keycloak-identity-and-access-management-for-modern-applications-9781804616444', note: 'By Keycloak\u2019s lead maintainers: realms, clients, flows, tokens, hardening. Get the 2023 2nd edition, not the 1st.' },
    { phase: 5, topic: 'Kafka', title: 'Apache Kafka 101 (2025 edition)', author: 'Confluent Developer', cost: 'Free', url: 'https://developer.confluent.io/courses/apache-kafka/events/', note: 'The canonical intro \u2014 topics, partitions, consumer groups \u2014 freshly re-recorded.' },
    { phase: 5, topic: 'Kafka', title: 'Apache Kafka for .NET Developers', author: 'Confluent Developer', cost: 'Free', url: 'https://developer.confluent.io/courses/apache-kafka-for-dotnet/overview/', note: 'The rare Kafka course in C#, using the exact Confluent client ELM uses.' },
    { phase: 5, topic: 'Kafka', title: 'Kafka: The Definitive Guide, 2nd Ed.', author: 'O\u2019Reilly / Confluent', cost: 'Free PDF', url: 'https://www.confluent.io/resources/ebook/kafka-the-definitive-guide/', note: 'The reference book, legally free from Confluent \u2014 read the reliability and consumers chapters carefully.' },
    { phase: 5, topic: 'Kafka', title: 'ABP Kafka Event Bus integration doc', author: 'Volosoft', cost: 'Free', url: 'https://abp.io/docs/latest/Distributed-Event-Bus-Kafka-Integration', note: 'How ELM actually consumes Kafka \u2014 a must-read, with the Confluent .NET client docs.' },
    { phase: 5, topic: 'YARP', title: 'YARP official docs (getting started)', author: 'Microsoft', cost: 'Free', url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/yarp/getting-started', note: 'Routes, clusters, transforms. Docs moved to MS Learn \u2014 old microsoft.github.io links are stale. No paid YARP course is worth buying.' },
    { phase: 5, topic: 'YARP', title: 'Implementing an API Gateway with YARP', author: 'Milan Jovanovi\u0107', cost: 'Free', url: 'https://milanjovanovic.tech/blog/implementing-an-api-gateway-for-microservices-with-yarp', note: 'Mirrors ELM\u2019s exact gateway architecture, with a sample repo.' },
    { phase: 5, topic: 'Redis', title: 'Redis University \u2014 Redis for .NET developers', author: 'Redis', cost: 'Free (certificate)', url: 'https://university.redis.io/', note: 'StackExchange.Redis hands-on in C# \u2014 the only structured Redis course in your language.' },
    { phase: 5, topic: 'Redis', title: 'Redis docs (develop) + distributed locks', author: 'Redis', cost: 'Free', url: 'https://redis.io/docs/latest/develop/', note: 'Data types, caching patterns and the SET NX / Redlock pages that map to ELM\u2019s DistributedLock.Redis.' },
    { phase: 5, topic: 'Polly', title: 'Polly official docs', author: 'Polly', cost: 'Free', url: 'https://www.pollydocs.org/', note: 'Anchor here \u2014 the v8 resilience-pipelines API differs sharply from older blog posts and old Pluralsight courses.' },
    { phase: 5, topic: 'Polly', title: 'Build resilient HTTP apps', author: 'Microsoft Learn', cost: 'Free', url: 'https://learn.microsoft.com/en-us/dotnet/core/resilience/http-resilience', note: 'Microsoft.Extensions.Http.Resilience wraps Polly v8 \u2014 how modern .NET services actually consume it.' },
    { phase: 5, topic: 'MediatR & CQRS', title: 'CQRS Pattern With MediatR', author: 'Milan Jovanovi\u0107', cost: 'Free', url: 'https://milanjovanovic.tech/blog/cqrs-pattern-with-mediatr', note: 'Clearest modern treatment: commands/queries plus pipeline behaviours for validation and logging.' },
    { phase: 5, topic: 'MediatR & CQRS', title: 'Pragmatic Clean Architecture', author: 'Milan Jovanovi\u0107', cost: 'Paid $247 lifetime', url: 'https://milanjovanovic.tech/pragmatic-clean-architecture', note: 'CQRS+MediatR, DDD, Keycloak auth, Redis caching and Outbox in one production app \u2014 the single closest paid course to ELM\u2019s stack.' },
    { phase: 5, topic: 'MediatR & CQRS', title: 'Jimmy Bogard\u2019s blog (MediatR\u2019s author)', author: 'Jimmy Bogard', cost: 'Free', url: 'https://www.jimmybogard.com/tag/mediatr/', note: 'Patterns from the source. Note MediatR v13+ moved to a commercial licence \u2014 ELM is on v13, so your company presumably holds one.' },
    { phase: 5, topic: 'Observability', title: 'Serilog Best Practices', author: 'Ben Foster', cost: 'Free', url: 'https://benfoster.io/blog/serilog-best-practices/', note: 'The most-cited Serilog article; pair with the Serilog wiki.' },
    { phase: 5, topic: 'Observability', title: '.NET observability with OpenTelemetry', author: 'Microsoft Learn', cost: 'Free', url: 'https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel', note: 'Logs, metrics and traces including a Prometheus + Grafana walkthrough.' },
    { phase: 5, topic: 'Observability', title: 'prometheus-net + Xabaril health checks', author: 'OSS repos', cost: 'Free', url: 'https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks', note: 'The exact libraries in ELM\u2019s csproj files; Xabaril ships ready-made Kafka/Redis/Hangfire checks.' },
    { phase: 5, topic: 'Hangfire', title: 'Hangfire official docs', author: 'Hangfire', cost: 'Free', url: 'https://docs.hangfire.io/en/latest/', note: 'Compact and well written \u2014 don\u2019t skip the Best Practices page.' },
    { phase: 5, topic: 'Hangfire', title: 'From Zero to Hero: Background Processing in .NET', author: 'Dometrain', cost: 'Paid (sub)', url: 'https://dometrain.com/course/from-zero-to-hero-background-processing-in-dotnet/', note: 'Puts Hangfire in context against IHostedService and Quartz.' },

    { phase: 6, topic: 'Testing', title: 'Unit Testing Principles, Practices, and Patterns', author: 'Vladimir Khorikov, Manning', cost: 'Paid ~$32\u201350', url: 'https://www.manning.com/books/unit-testing', note: 'Top paid pick. What makes a test valuable, mocks vs stubs \u2014 in C#. Near-mandatory before working in a Moq/NSubstitute codebase.' },
    { phase: 6, topic: 'Testing', title: 'From Zero to Hero: Unit Testing in C#', author: 'Nick Chapsas, Dometrain', cost: 'Paid (sub)', url: 'https://dometrain.com/course/from-zero-to-hero-unit-testing-in-csharp/', note: 'xUnit + NSubstitute/Moq \u2014 matches ELM\u2019s exact stack.' },
    { phase: 6, topic: 'Testing', title: 'From Zero to Hero: Integration Testing in ASP.NET Core', author: 'Dometrain', cost: 'Paid (sub)', url: 'https://dometrain.com/course/from-zero-to-hero-integration-testing-in-asp-dot-net-core/', note: 'WebApplicationFactory, Testcontainers, WireMock \u2014 the best treatment of the don\u2019t-rely-on-EF-InMemory consensus.' },
    { phase: 6, topic: 'Testing', title: 'Microsoft testing docs (xUnit + EF testing)', author: 'Microsoft', cost: 'Free', url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit', note: 'Top free pick. The EF testing page addresses InMemory vs SQLite vs a real database head-on.' },
    { phase: 6, topic: 'Testing', title: 'xUnit / NSubstitute / Shouldly docs', author: 'OSS', cost: 'Free', url: 'https://xunit.net/', note: 'Bookmark-tier references for ELM\u2019s exact test libraries.' }
  ];

const PURCHASES = [
    { when: 'Phase 1 (now)', what: 'Ultimate C# Masterclass on a Udemy sale \u2014 or stay free with Dometrain\u2019s beginner course', cost: '$0\u201325' },
    { when: 'Phase 3', what: 'T-SQL Fundamentals (Ben-Gan)', cost: '~$45' },
    { when: 'Phase 4', what: 'Learning DDD (Khononov); Mastering ABP if your license admin can\u2019t get it free', cost: '~$45 (+$36)' },
    { when: 'Phases 4\u20136', what: 'One quarter of Dometrain Pro (EF Core, DDD \u00d72, REST APIs, testing \u00d72, Docker, OTel, background jobs)', cost: '$165' },
    { when: 'Phase 5', what: 'Pragmatic Clean Architecture (MediatR + Keycloak + Redis in one) \u2014 optional but uniquely on-stack', cost: '$247' },
    { when: 'Phase 6', what: 'Unit Testing Principles (Khorikov)', cost: '~$45' }
  ];

const STACK = [
    { area: 'Language / runtime', tech: 'C# 13 on .NET 9 \u2014 all 225 projects target net9.0' },
    { area: 'Web framework', tech: 'ASP.NET Core Web API' },
    { area: 'App framework', tech: 'ABP Framework 9.3 (commercial) \u2014 every service follows the ABP layered DDD template' },
    { area: 'ORM / database', tech: 'Entity Framework Core 9 + SQL Server 2022 \u2014 one DB per service, DbMigrator console apps' },
    { area: 'API gateway', tech: 'YARP reverse proxy (APIGateway/UVP.WebGateway) + ABP multi-tenancy' },
    { area: 'Identity / auth', tech: 'Keycloak 24 (OIDC / OAuth2, realm uvp), JWT bearer tokens' },
    { area: 'Messaging', tech: 'Kafka \u2014 Confluent.Kafka + Volo.Abp.EventBus.Kafka, with Zookeeper and Kafka UI' },
    { area: 'Caching / locking', tech: 'Redis \u2014 ABP distributed cache, DistributedLock.Redis, DataProtection key storage' },
    { area: 'Background jobs', tech: 'Hangfire (SQL Server storage) + ABP background jobs/workers, BackgroundJobs.Host projects' },
    { area: 'CQRS / mediator', tech: 'MediatR 13' },
    { area: 'Validation', tech: 'FluentValidation 12' },
    { area: 'Object mapping', tech: 'AutoMapper via Volo.Abp.AutoMapper' },
    { area: 'Templating', tech: 'Scriban (emails / text templates) + ABP Text Template Management' },
    { area: 'Logging', tech: 'Serilog (console, file, async sinks) + shared UVP.Shared.Logging' },
    { area: 'Resilience', tech: 'Polly via Microsoft.Extensions.Http.Polly' },
    { area: 'Observability', tech: 'Prometheus metrics, ASP.NET Core health checks + UI, Elastic APM in some services' },
    { area: 'API docs', tech: 'Swagger / Swashbuckle' },
    { area: 'Testing', tech: 'xUnit + Moq + NSubstitute + Shouldly + EF Core InMemory, ABP TestBase' },
    { area: 'File management', tech: 'Volo.FileManagement module + UVP.Shared.FileManagement' },
    { area: 'Shared packages', tech: 'UVP.Shared.Services / HostingModule / Kafka / AuditLog / Logging \u2014 private NuGet feed' },
    { area: 'Local dev tooling', tech: 'Docker Compose (startup-docker-images), dev-runner Node CLI, ABP CLI (abp generate-proxy)' }
  ];

const SERVICES = ['Administration', 'Collaboration', 'Engagement', 'EvaluationManagement', 'IdeasBank', 'Membership', 'Opportunity', 'OrganizationManagement', 'PrivateEntityVolunteer', 'Reporting', 'TeamsManagement', 'UserManagement', 'VolunteerManagement', 'VolunteerOperations', 'VolunteerOpportunityEnrollment', 'WebGateway'];

const SKIPS = ['gRPC', 'SignalR', 'MongoDB', 'RabbitMQ (image present, unused)', 'Dapper', 'Blazor / Razor Pages', 'Azure Functions', 'MassTransit', 'NServiceBus', 'IdentityServer / OpenIddict internals'];
