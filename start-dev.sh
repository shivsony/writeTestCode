#!/bin/bash

echo "🚀 Starting AI Test Automation Assistant Development Environment"
echo "=============================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "demo-app/node_modules" ]; then
    echo "📦 Installing demo app dependencies..."
    cd demo-app && npm install && cd ..
fi

# Check for .env file
if [ ! -f "backend/.env" ]; then
    echo "⚠️  No .env file found in backend directory"
    echo "📝 Creating .env file from template..."
    cp backend/env.example backend/.env
    echo "🔑 Please edit backend/.env and add your OpenAI API key"
    echo "   OPENAI_API_KEY=your_openai_api_key_here"
fi

echo ""
echo "🎯 Available services:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend:     http://localhost:3001"
echo "   Demo App:    http://localhost:3002"
echo ""
echo "🚀 Starting all services..."

# Start all services concurrently
npm run dev &
BACKEND_PID=$!

# Start demo app
cd demo-app && npm start &
DEMO_PID=$!
cd ..

echo "✅ All services started!"
echo "   Frontend PID: $BACKEND_PID"
echo "   Demo App PID: $DEMO_PID"
echo ""
echo "📖 Open http://localhost:3000 to use the AI Test Automation Assistant"
echo "🎯 Open http://localhost:3002 to see the demo app"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
