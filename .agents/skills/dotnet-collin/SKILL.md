---
name: dotnet-collin
description: Dotnet Collin workflow notes for Collin-specific .NET projects. Use when the user names dotnet-collin, works on the Collin .NET codebase, creates or fixes `.slnx` solution layout, updates README project documentation, works with EF Core data access, documents or implements JWT Dynamic RBAC, applies feature-oriented architecture, applies stage config conventions, applies professional .NET AI coding-agent rules, or asks to capture a new Collin workflow, feature rule, build step, testing habit, or project convention.
---

# Dotnet Collin

## Workflow

- Read the touched project files first: `.sln`, `.slnx`, `.csproj`, `Program.cs`, appsettings, tests, and nearby code.
- When creating a new `.slnx`, create a dedicated folder for it first. If generated files land outside the folder, create the folder and move the `.slnx`, projects, config, and related files into it before continuing.
- Prefer existing project patterns over new abstractions, packages, or folder structures.
- Use `dotnet` CLI commands already implied by the repo; add a new tool only when the project already uses it or the user asks.
- Keep changes small and verify with the narrowest relevant command, such as `dotnet test`, `dotnet build`, or a targeted test project.

## Agent Rules

- Understand before coding: read project structure, requirements, conventions, and architecture; ask when business logic is unclear.
- Make the smallest necessary change, preserve existing behavior, and never invent schema, API responses, config values, environment variables, secrets, or business rules.
- Respect existing architecture and patterns, including feature-oriented architecture, Clean Architecture, CQRS, repository/service/result patterns, MVC/Minimal API style, and existing data-access choices.
- Write production ASP.NET Core code with validation, error handling, logging, `CancellationToken`, async/await, dependency injection, authentication, authorization, and secret-safe configuration.
- Review performance and EF/SQL work for N+1 queries, unnecessary `ToList()`, over-fetching, missing pagination/indexes, repeated database calls, and avoid `.Result`, `.Wait()`, or `Task.Run` inside requests.
- Before done, check syntax, namespaces, dependencies, nullable warnings, build/test results, security impact, side effects, breaking changes, and touched tests/docs.

## Display Formatting

- Use `dd-MM-yyyy` for dates and `dd-MM-yyyy hh:mm tt` for date-times in C# display code.
- Show numbers and amounts with thousand separators; MMK amounts must be suffix style, for example `1,000.00 MMK`, not `MMK 1000`.
- Use readable table/report headers with spaces, for example `CreatedDate` becomes `Created Date`.
- Align text columns left, amount/numeric columns right, and keep only serial/action/checkbox columns centered.
- Keep large dialogs within the viewport and use a vertical scrollbar for overflowing dialog content.
- Provide a close button in both the header and footer of dialogs.

## Stage Config

- Prefer the Collin stage config pattern for shared app configuration: root `Config/appsettings.json` contains stable defaults and `Stage`; root `Config/custom-settings-{stage}.json` contains stage-specific values.
- Add a shared `AddStageConfig(WebApplicationBuilder builder)` extension when multiple .NET apps need the same config. It should load `Config/appsettings.json`, read `Stage`, then load `custom-settings-{stage}.json`.
- If apps live below folders like `src/<Project>`, make the extension search parent folders for `Config` instead of hardcoding one relative path.
- Call `builder.AddStageConfig()` immediately after `WebApplication.CreateBuilder(args)` in each web app.
- Remove duplicated per-app `appsettings*.json` values once shared config owns them; keep per-app files only for values that are genuinely app-specific.
- Do not store secrets in committed stage config. Use placeholders or local ignored overrides when real credentials are needed.
- For step-by-step code flow, read `references/stage-config-pattern.md`.

## Documentation

- When explaining a project for junior developers, update `README.md` with a clear project overview, workflow, Mermaid flowchart, and Mermaid code flow chart.

## Feature-Oriented Architecture

- For feature-oriented .NET project structure, API-to-domain-to-UI code flow, and junior-developer diagrams, read `references/feature-oriented-architecture.md`.

## Data Access

- Use EF Core by default.
- Prefer EF Core database-first for Collin projects. Use EF Core InMemory for lightweight/test/demo databases and MSSQL for real persistence unless the existing project already uses another provider.
- Keep existing Dapper, ADO.NET, raw SQL, or EF usage unless the user asks to change it or the project clearly requires it.

## JWT Dynamic RBAC

- For JWT Dynamic RBAC implementation, explanation, README, or junior-developer code-flow work, read `references/jwt-dynamic-rbac.md`.

## Knowledge Capture

- When the user says a new Collin workflow or feature rule needs to be remembered, update this skill.
- Store only stable, reusable guidance here. Put long commands, schemas, or examples in `references/` only after they become too large for this file.
- Delete stale rules instead of keeping historical notes.
