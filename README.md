# AI Test Automation Assistant

An intelligent web application that generates manual test cases and automated Playwright scripts from user stories, runs tests, and suggests fixes when tests fail.

## 🚀 Features

### MVP Features
- **Test Generation**: Generate manual test cases and Playwright scripts from user stories
- **Test Execution**: Run Playwright tests and capture results with screenshots
- **Change Detection**: AI-powered suggestions for fixing failing tests
- **Edge Case Detection**: Identify potential edge cases and negative scenarios
- **Modern UI**: Clean React frontend with TailwindCSS

### Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4 API
- **Testing**: Playwright
- **Demo App**: Simple Todo/Login app for testing

## 📁 Project Structure

```
/ai-test-automation-assistant
  /frontend (React + Tailwind)
    /src
      /components (UI components)
      /context (React context)
      /services (API services)
  /backend (Node + Express)
    /routes (API endpoints)
    /services (AI & Playwright services)
  /demo-app (Simple demo app)
    /public (Static files)
  README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
cd backend
cp env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 3. Start the Applications

```bash
# Start all services (frontend + backend)
npm run dev

# Or start individually:
npm run frontend:dev  # Frontend on http://localhost:3000
npm run backend:dev   # Backend on http://localhost:3001
```

### 4. Start Demo App (Optional)

```bash
cd demo-app
npm install
npm start  # Demo app on http://localhost:3002
```

## 🎯 Usage

### 1. Generate Tests
1. Open http://localhost:3000
2. Enter a user story in the input field
3. Click "Generate All Tests" to create:
   - Manual test cases
   - Playwright automation script
   - Edge case suggestions

### 2. Run Tests
1. Go to the "Run Tests" tab
2. Click "Run Generated Test" to execute the Playwright script
3. View results with screenshots and logs

### 3. View Results
1. Go to the "Results" tab
2. See all test execution results
3. Filter by status (passed/failed/pending)

## 📊 API Endpoints

### Test Generation
- `POST /api/generate/manual-tests` - Generate manual test cases
- `POST /api/generate/playwright` - Generate Playwright test script
- `POST /api/generate/all` - Generate both manual and automated tests
- `POST /api/generate/edge-cases` - Suggest edge cases

### Test Execution
- `POST /api/run/test` - Run a single test
- `POST /api/run/tests` - Run multiple tests
- `GET /api/run/results` - Get all test results
- `GET /api/run/result/:testId` - Get specific test result

### Change Detection
- `POST /api/detect/changes` - Detect changes and suggest fixes
- `POST /api/detect/analyze-failure` - Analyze test failure
- `POST /api/detect/validate-selectors` - Validate test selectors

## 🧪 Demo App

The demo app (http://localhost:3002) provides a simple Todo/Login application for testing:

### Features
- User registration and login
- Password reset functionality
- Todo CRUD operations
- Proper data-testid attributes for robust testing

### Test Credentials
- Email: `demo@example.com`
- Password: `password123`

## 📝 Example User Stories

Try these user stories to generate tests:

```
As a registered user, I want to reset my password so I can regain access to my account.

As a user, I want to add a new todo item so I can track my tasks.

As a user, I want to mark a todo as completed so I can track my progress.

As a user, I want to delete a todo item so I can remove completed tasks.
```

## 🔧 Configuration

### OpenAI API
The app uses OpenAI's GPT-4 for test generation. Make sure to:
1. Get an API key from https://platform.openai.com/
2. Add it to your `.env` file
3. Ensure you have sufficient credits

### Playwright Configuration
Playwright tests run in headless mode by default. Screenshots are captured at:
- Initial state
- Final state  
- Error state (if test fails)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist folder
```

### Backend (Render/Heroku)
```bash
cd backend
# Deploy with environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎥 Demo Video

Record a 5-minute demo showing:
1. Entering a user story
2. Generating tests
3. Running the generated test
4. Viewing results
5. Demonstrating change detection

## 🔮 Future Enhancements

- [ ] Cypress and Selenium support
- [ ] Postman API test generation
- [ ] Coverage mapping
- [ ] GitHub Actions integration
- [ ] Test export functionality
- [ ] Multi-language support
- [ ] Team collaboration features
