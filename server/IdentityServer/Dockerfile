FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://+:5001

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ./IdentityServer/IdentityServer.csproj ./IdentityServer/
COPY ./AuthData/AuthData.csproj ./AuthData/
RUN dotnet restore "IdentityServer/IdentityServer.csproj"
COPY ./IdentityServer ./IdentityServer
COPY ./AuthData ./AuthData

WORKDIR "/src/IdentityServer"
RUN dotnet build "IdentityServer.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "IdentityServer.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "IdentityServer.dll"]
