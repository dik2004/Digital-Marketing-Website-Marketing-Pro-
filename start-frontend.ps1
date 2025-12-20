# Frontend Server Startup Script
Write-Host "🎨 Starting Frontend Development Server..." -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location digital-marketing-website

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "✅ Starting Vite dev server..." -ForegroundColor Green
Write-Host "🌐 Frontend will be available at http://localhost:5173" -ForegroundColor Green
Write-Host ""
npm run dev


