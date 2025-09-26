const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Detect changes and suggest fixes
router.post('/changes', async (req, res) => {
  try {
    const { failingSelector, currentDOM, errorMessage, testCode } = req.body;
    
    if (!failingSelector || !currentDOM) {
      return res.status(400).json({ 
        error: 'Failing selector and current DOM are required' 
      });
    }

    const suggestion = await aiService.detectChangesAndSuggestFix(
      failingSelector, 
      currentDOM, 
      errorMessage || 'Selector not found'
    );
    
    res.json({
      success: true,
      data: suggestion
    });
  } catch (error) {
    console.error('Error detecting changes:', error);
    res.status(500).json({ 
      error: 'Failed to detect changes',
      message: error.message 
    });
  }
});

// Analyze test failure and suggest comprehensive fix
router.post('/analyze-failure', async (req, res) => {
  try {
    const { 
      testCode, 
      errorMessage, 
      currentDOM, 
      testLogs,
      screenshots 
    } = req.body;
    
    if (!testCode || !errorMessage) {
      return res.status(400).json({ 
        error: 'Test code and error message are required' 
      });
    }

    // Extract failing selector from error message
    const selectorMatch = errorMessage.match(/selector[:\s]+([^\s]+)/i);
    const failingSelector = selectorMatch ? selectorMatch[1] : 'unknown';

    const suggestion = await aiService.detectChangesAndSuggestFix(
      failingSelector,
      currentDOM || '<div>DOM not available</div>',
      errorMessage
    );

    // Generate updated test code if possible
    let updatedTestCode = null;
    if (suggestion.updatedSelector && testCode) {
      try {
        updatedTestCode = testCode.replace(
          new RegExp(failingSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          suggestion.updatedSelector
        );
      } catch (replaceError) {
        console.warn('Could not update test code:', replaceError.message);
      }
    }
    
    res.json({
      success: true,
      data: {
        ...suggestion,
        updatedTestCode,
        originalTestCode: testCode,
        analysis: {
          failingSelector,
          errorMessage,
          hasDOM: !!currentDOM,
          hasLogs: !!testLogs,
          hasScreenshots: !!screenshots
        }
      }
    });
  } catch (error) {
    console.error('Error analyzing failure:', error);
    res.status(500).json({ 
      error: 'Failed to analyze failure',
      message: error.message 
    });
  }
});

// Validate test selectors against current DOM
router.post('/validate-selectors', async (req, res) => {
  try {
    const { testCode, currentDOM } = req.body;
    
    if (!testCode || !currentDOM) {
      return res.status(400).json({ 
        error: 'Test code and current DOM are required' 
      });
    }

    // Extract selectors from test code
    const selectorRegex = /(?:page\.(?:getBy|locator|click|fill|select|check|uncheck|hover|dblclick|rightclick|press|type|tap|focus|blur|screenshot|waitFor|expect)\(['"`]([^'"`]+)['"`]\)|page\.locator\(['"`]([^'"`]+)['"`]\))/g;
    const selectors = [];
    let match;
    
    while ((match = selectorRegex.exec(testCode)) !== null) {
      const selector = match[1] || match[2];
      if (selector) {
        selectors.push(selector);
      }
    }

    // Check which selectors exist in current DOM
    const validationResults = selectors.map(selector => {
      const exists = currentDOM.includes(selector) || 
                    currentDOM.includes(`data-testid="${selector}"`) ||
                    currentDOM.includes(`id="${selector}"`) ||
                    currentDOM.includes(`class="${selector}"`);
      
      return {
        selector,
        exists,
        type: selector.startsWith('#') ? 'id' : 
              selector.startsWith('.') ? 'class' :
              selector.startsWith('[') ? 'attribute' : 'text'
      };
    });
    
    res.json({
      success: true,
      data: {
        selectors: validationResults,
        totalSelectors: selectors.length,
        validSelectors: validationResults.filter(r => r.exists).length,
        invalidSelectors: validationResults.filter(r => !r.exists).length
      }
    });
  } catch (error) {
    console.error('Error validating selectors:', error);
    res.status(500).json({ 
      error: 'Failed to validate selectors',
      message: error.message 
    });
  }
});

module.exports = router;
