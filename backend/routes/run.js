const express = require('express');
const router = express.Router();
const playwrightRunner = require('../services/playwrightRunner');
const path = require('path');

// Run a single Playwright test
router.post('/test', async (req, res) => {
  try {
    const { testCode, testName } = req.body;
    
    if (!testCode) {
      return res.status(400).json({ error: 'Test code is required' });
    }

    const result = await playwrightRunner.runTest(testCode, testName);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error running test:', error);
    res.status(500).json({ 
      error: 'Failed to run test',
      message: error.message 
    });
  }
});

// Run multiple tests
router.post('/tests', async (req, res) => {
  try {
    const { tests } = req.body;
    
    if (!tests || !Array.isArray(tests)) {
      return res.status(400).json({ error: 'Tests array is required' });
    }

    const results = await playwrightRunner.runMultipleTests(tests);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error running tests:', error);
    res.status(500).json({ 
      error: 'Failed to run tests',
      message: error.message 
    });
  }
});

// Get test result by ID
router.get('/result/:testId', (req, res) => {
  try {
    const { testId } = req.params;
    const result = playwrightRunner.getTestResult(testId);
    
    if (!result) {
      return res.status(404).json({ error: 'Test result not found' });
    }
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting test result:', error);
    res.status(500).json({ 
      error: 'Failed to get test result',
      message: error.message 
    });
  }
});

// Get all test results
router.get('/results', (req, res) => {
  try {
    const results = playwrightRunner.getAllResults();
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error getting test results:', error);
    res.status(500).json({ 
      error: 'Failed to get test results',
      message: error.message 
    });
  }
});

// Serve screenshots
router.get('/screenshots/:testId/:filename', (req, res) => {
  try {
    const { testId, filename } = req.params;
    const screenshotPath = path.join(__dirname, '../results', testId, 'screenshots', filename);
    
    if (!require('fs').existsSync(screenshotPath)) {
      return res.status(404).json({ error: 'Screenshot not found' });
    }
    
    res.sendFile(screenshotPath);
  } catch (error) {
    console.error('Error serving screenshot:', error);
    res.status(500).json({ 
      error: 'Failed to serve screenshot',
      message: error.message 
    });
  }
});

module.exports = router;
