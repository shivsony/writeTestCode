# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Prerequisites
- Node.js 18+ installed
- OpenAI API key (get from https://platform.openai.com/)

### 2. One-Command Setup
```bash
# Clone and setup everything
git clone <your-repo>
cd ai-test-automation-assistant
chmod +x start-dev.sh
./start-dev.sh
```

### 3. Add OpenAI API Key
```bash
# Edit the .env file
nano backend/.env

# Add your API key:
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. Access the Applications
- **Main App**: http://localhost:3000
- **Demo App**: http://localhost:3002
- **Backend API**: http://localhost:3001

## 🧪 Test the System

### 1. Generate Tests
1. Open http://localhost:3000
2. Enter this user story:
   ```
   As a registered user, I want to reset my password so I can regain access to my account.
   ```
3. Set base URL to: `http://localhost:3002`
4. Click "Generate All Tests"

### 2. Run Tests
1. Go to "Run Tests" tab
2. Click "Run Generated Test"
3. View results with screenshots

### 3. View Results
1. Go to "Results" tab
2. See all test executions

## 🎯 Demo App Features

The demo app at http://localhost:3002 includes:
- **Login**: demo@example.com / password123
- **Registration**: Create new accounts
- **Password Reset**: Test reset functionality
- **Todo Management**: Add, complete, delete todos

## 🔧 Troubleshooting

### Common Issues

**"OpenAI API Error"**
- Check your API key in `backend/.env`
- Ensure you have credits in your OpenAI account

**"Port already in use"**
- Kill existing processes: `lsof -ti:3000,3001,3002 | xargs kill -9`
- Or change ports in the respective package.json files

**"Module not found"**
- Run: `npm run install:all`
- Or manually: `cd backend && npm install && cd ../frontend && npm install`

**"Playwright tests fail"**
- Ensure demo app is running on port 3002
- Check that the demo app is accessible

### Manual Setup (if script fails)

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd demo-app && npm install && cd ..

# Start services
npm run dev &          # Frontend + Backend
cd demo-app && npm start &  # Demo app
```

## 📊 API Testing

Test the API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Generate manual tests
curl -X POST http://localhost:3001/api/generate/manual-tests \
  -H "Content-Type: application/json" \
  -d '{"userStory": "As a user, I want to login so I can access my account"}'

# Generate Playwright test
curl -X POST http://localhost:3001/api/generate/playwright \
  -H "Content-Type: application/json" \
  -d '{"requirement": "Login functionality", "baseURL": "http://localhost:3002"}'
```

## 🎥 Demo Script

For your 5-minute demo:

1. **Show the UI** (30 seconds)
   - Open http://localhost:3000
   - Explain the three tabs: Generate, Run, Results

2. **Generate Tests** (1 minute)
   - Enter user story about password reset
   - Show generated manual tests
   - Show generated Playwright script
   - Show edge cases

3. **Run Tests** (1 minute)
   - Go to Run Tests tab
   - Execute the generated test
   - Show results with screenshots

4. **Show Results** (30 seconds)
   - Go to Results tab
   - Show test history and filtering

5. **Demo App** (1 minute)
   - Open http://localhost:3002
   - Show login, registration, todos
   - Explain how tests target this app

6. **Wrap up** (30 seconds)
   - Explain the AI-powered features
   - Mention future enhancements

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render/Heroku)
```bash
cd backend
# Deploy with environment variables:
# OPENAI_API_KEY=your-key
# NODE_ENV=production
```

## 📝 Sample User Stories

Try these for testing:

```
As a registered user, I want to reset my password so I can regain access to my account.

As a user, I want to add a new todo item so I can track my tasks.

As a user, I want to mark a todo as completed so I can track my progress.

As a user, I want to delete a todo item so I can remove completed tasks.

As a new user, I want to register an account so I can access the application.

As a user, I want to logout so I can secure my session.
```
