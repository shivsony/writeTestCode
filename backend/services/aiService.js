const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateManualTests(userStory) {
    const prompt = `You are a QA engineer. Generate 5 manual test cases for this user story.
Return ONLY valid JSON following this schema:
[ { "title": "string", "preconditions": "string", "steps": ["step 1", "step 2"], "expected": "string", "priority": "High|Medium|Low", "tags": ["tag1", "tag2"] } ]

User story:
"${userStory}"`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert QA engineer. Always return valid JSON only, no additional text or explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating manual tests:', error);
      throw new Error('Failed to generate manual tests');
    }
  }

  async generatePlaywrightTest(requirement, baseURL = 'https://demo.example.com') {
    const prompt = `You are an expert SDET. Generate a Playwright test (JavaScript, .spec.js file) for this requirement.
Assume baseURL = ${baseURL}.
Selectors must be robust (prefer data-testid, otherwise roles).
Return only runnable code with proper imports and test structure.

Requirement:
"${requirement}"`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert SDET. Return only runnable Playwright test code with proper imports, no explanations or markdown formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 3000
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating Playwright test:', error);
      throw new Error('Failed to generate Playwright test');
    }
  }

  async detectChangesAndSuggestFix(failingSelector, currentDOM, errorMessage) {
    const prompt = `You are a test maintenance assistant. The following Playwright test failed because a selector changed.
Here is the failing selector: ${failingSelector}
Here is the current DOM snippet: ${currentDOM}
Error message: ${errorMessage}

Suggest an updated selector and return JSON:
{ "issue": "string", "suggestion": "string", "updatedSelector": "string" }`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a test maintenance assistant. Return only valid JSON with issue description and suggested fix."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error detecting changes:', error);
      throw new Error('Failed to detect changes and suggest fix');
    }
  }

  async suggestEdgeCases(userStory) {
    const prompt = `You are a QA engineer. Analyze this user story and suggest 3-5 edge cases or negative test scenarios that might be missed.
Return ONLY valid JSON following this schema:
[ { "title": "string", "description": "string", "priority": "High|Medium|Low", "category": "string" } ]

User story:
"${userStory}"`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert QA engineer. Always return valid JSON only, no additional text or explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error suggesting edge cases:', error);
      throw new Error('Failed to suggest edge cases');
    }
  }
}

module.exports = new AIService();
