# Backend Server Startup Script
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "⚠️  .env file not found! Creating default..." -ForegroundColor Yellow
    "MONGO_URI=mongodb://localhost:27017/digital-marketing" | Out-File -FilePath .env -Encoding utf8
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "✅ Starting server on http://localhost:5000" -ForegroundColor Green
Write-Host ""
npm run dev


