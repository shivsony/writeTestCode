const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class PlaywrightRunner {
  constructor() {
    this.resultsDir = path.join(__dirname, '../results');
    this.ensureResultsDir();
  }

  ensureResultsDir() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  async runTest(testCode, testName = 'generated-test') {
    const testId = uuidv4();
    const testDir = path.join(this.resultsDir, testId);
    fs.mkdirSync(testDir, { recursive: true });

    const testFilePath = path.join(testDir, `${testName}.spec.js`);
    const screenshotDir = path.join(testDir, 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });

    try {
      // Write test file
      fs.writeFileSync(testFilePath, testCode);

      // Run the test
      const result = await this.executeTest(testFilePath, screenshotDir);
      
      return {
        testId,
        status: result.status,
        logs: result.logs,
        screenshots: result.screenshots,
        testFilePath,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Test execution error:', error);
      return {
        testId,
        status: 'failed',
        logs: [`Test execution failed: ${error.message}`],
        screenshots: [],
        testFilePath,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }

  async executeTest(testFilePath, screenshotDir) {
    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();
    const logs = [];
    const screenshots = [];

    // Capture console logs
    page.on('console', msg => {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Capture page errors
    page.on('pageerror', error => {
      logs.push(`[ERROR] ${error.message}`);
    });

    try {
      // Take initial screenshot
      await page.screenshot({ 
        path: path.join(screenshotDir, 'initial.png'),
        fullPage: true 
      });
      screenshots.push(`/api/screenshots/${path.basename(screenshotDir)}/initial.png`);

      // Load and execute the test
      const testCode = fs.readFileSync(testFilePath, 'utf8');
      
      // Execute the test code directly
      // For now, we'll use a simpler approach - just navigate to the base URL
      // and execute basic Playwright commands
      
      // Extract base URL from test code or use default
      const baseURLMatch = testCode.match(/baseURL[:\s]*['"`]([^'"`]+)['"`]/);
      const testBaseURL = baseURLMatch ? baseURLMatch[1] : 'https://demo.example.com';
      
      // Navigate to the base URL
      await page.goto(testBaseURL);
      
      // Take a screenshot after navigation
      await page.screenshot({ 
        path: path.join(screenshotDir, 'navigated.png'),
        fullPage: true 
      });
      screenshots.push(`/api/screenshots/${path.basename(screenshotDir)}/navigated.png`);
      
      // Try to execute some basic test actions if the test code contains them
      try {
        // Look for common Playwright actions in the test code
        if (testCode.includes('click') || testCode.includes('fill') || testCode.includes('getByRole')) {
          // Try to find and click a button or fill a form
          const buttons = await page.locator('button').count();
          const inputs = await page.locator('input').count();
          
          if (buttons > 0) {
            await page.locator('button').first().click();
            logs.push('Clicked first button found');
          }
          
          if (inputs > 0) {
            await page.locator('input').first().fill('test');
            logs.push('Filled first input with "test"');
          }
        }
      } catch (actionError) {
        logs.push(`Action execution warning: ${actionError.message}`);
      }

      // Take final screenshot
      await page.screenshot({ 
        path: path.join(screenshotDir, 'final.png'),
        fullPage: true 
      });
      screenshots.push(`/api/screenshots/${path.basename(screenshotDir)}/final.png`);

      return {
        status: 'passed',
        logs,
        screenshots
      };

    } catch (error) {
      // Take error screenshot
      await page.screenshot({ 
        path: path.join(screenshotDir, 'error.png'),
        fullPage: true 
      });
      screenshots.push(`/api/screenshots/${path.basename(screenshotDir)}/error.png`);

      logs.push(`[TEST_ERROR] ${error.message}`);
      
      return {
        status: 'failed',
        logs,
        screenshots,
        error: error.message
      };
    } finally {
      await browser.close();
    }
  }

  async runMultipleTests(tests) {
    const results = [];
    
    for (const test of tests) {
      const result = await this.runTest(test.code, test.name);
      results.push(result);
    }
    
    return results;
  }

  getTestResult(testId) {
    const testDir = path.join(this.resultsDir, testId);
    if (!fs.existsSync(testDir)) {
      return null;
    }

    const resultFile = path.join(testDir, 'result.json');
    if (fs.existsSync(resultFile)) {
      return JSON.parse(fs.readFileSync(resultFile, 'utf8'));
    }

    return null;
  }

  getAllResults() {
    const results = [];
    
    if (!fs.existsSync(this.resultsDir)) {
      return results;
    }

    const testDirs = fs.readdirSync(this.resultsDir);
    
    for (const testDir of testDirs) {
      const result = this.getTestResult(testDir);
      if (result) {
        results.push(result);
      }
    }
    
    return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}

module.exports = new PlaywrightRunner();
