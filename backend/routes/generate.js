const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Generate manual test cases
router.post('/manual-tests', async (req, res) => {
  try {
    const { userStory } = req.body;
    
    if (!userStory) {
      return res.status(400).json({ error: 'User story is required' });
    }

    const manualTests = await aiService.generateManualTests(userStory);
    
    res.json({
      success: true,
      data: manualTests,
      count: manualTests.length
    });
  } catch (error) {
    console.error('Error generating manual tests:', error);
    res.status(500).json({ 
      error: 'Failed to generate manual tests',
      message: error.message 
    });
  }
});

// Generate Playwright test script
router.post('/playwright', async (req, res) => {
  try {
    const { requirement, baseURL } = req.body;
    
    if (!requirement) {
      return res.status(400).json({ error: 'Requirement is required' });
    }

    const playwrightTest = await aiService.generatePlaywrightTest(requirement, baseURL);
    
    res.json({
      success: true,
      data: {
        testCode: playwrightTest,
        requirement,
        baseURL: baseURL || 'https://demo.example.com'
      }
    });
  } catch (error) {
    console.error('Error generating Playwright test:', error);
    res.status(500).json({ 
      error: 'Failed to generate Playwright test',
      message: error.message 
    });
  }
});

// Generate both manual tests and Playwright script
router.post('/all', async (req, res) => {
  try {
    const { userStory, baseURL } = req.body;
    
    if (!userStory) {
      return res.status(400).json({ error: 'User story is required' });
    }

    // Generate both in parallel
    const [manualTests, playwrightTest] = await Promise.all([
      aiService.generateManualTests(userStory),
      aiService.generatePlaywrightTest(userStory, baseURL)
    ]);
    
    res.json({
      success: true,
      data: {
        manualTests,
        playwrightTest: {
          testCode: playwrightTest,
          requirement: userStory,
          baseURL: baseURL || 'https://demo.example.com'
        }
      }
    });
  } catch (error) {
    console.error('Error generating tests:', error);
    res.status(500).json({ 
      error: 'Failed to generate tests',
      message: error.message 
    });
  }
});

// Suggest edge cases
router.post('/edge-cases', async (req, res) => {
  try {
    const { userStory } = req.body;
    
    if (!userStory) {
      return res.status(400).json({ error: 'User story is required' });
    }

    const edgeCases = await aiService.suggestEdgeCases(userStory);
    
    res.json({
      success: true,
      data: edgeCases,
      count: edgeCases.length
    });
  } catch (error) {
    console.error('Error suggesting edge cases:', error);
    res.status(500).json({ 
      error: 'Failed to suggest edge cases',
      message: error.message 
    });
  }
});

module.exports = router;
