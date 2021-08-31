FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://+:5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ./API/API.csproj ./API/
COPY ./Data/Data.csproj ./Data/
COPY ./Services/Services.csproj ./Services/
RUN dotnet restore "API/API.csproj"
COPY ./API ./API
COPY ./Data ./Data
COPY ./Services ./Services

WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "API.dll"]
