import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for AI requests
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error.response?.data || { message: 'Network error' })
  }
)

// Test Generation APIs
export const generateManualTests = async (userStory) => {
  const response = await api.post('/generate/manual-tests', { userStory })
  return response.data
}

export const generatePlaywrightTest = async (requirement, baseURL) => {
  const response = await api.post('/generate/playwright', { requirement, baseURL })
  return response.data
}

export const generateTests = async (userStory, baseURL) => {
  const response = await api.post('/generate/all', { userStory, baseURL })
  return response.data
}

export const generateEdgeCases = async (userStory) => {
  const response = await api.post('/generate/edge-cases', { userStory })
  return response.data
}

// Test Execution APIs
export const runTest = async (testCode, testName) => {
  const response = await api.post('/run/test', { testCode, testName })
  return response.data
}

export const runTests = async (tests) => {
  const response = await api.post('/run/tests', { tests })
  return response.data
}

export const getTestResult = async (testId) => {
  const response = await api.get(`/run/result/${testId}`)
  return response.data
}

export const getAllResults = async () => {
  const response = await api.get('/run/results')
  return response.data
}

// Change Detection APIs
export const detectChanges = async (failingSelector, currentDOM, errorMessage) => {
  const response = await api.post('/detect/changes', {
    failingSelector,
    currentDOM,
    errorMessage
  })
  return response.data
}

export const analyzeFailure = async (testCode, errorMessage, currentDOM, testLogs, screenshots) => {
  const response = await api.post('/detect/analyze-failure', {
    testCode,
    errorMessage,
    currentDOM,
    testLogs,
    screenshots
  })
  return response.data
}

export const validateSelectors = async (testCode, currentDOM) => {
  const response = await api.post('/detect/validate-selectors', {
    testCode,
    currentDOM
  })
  return response.data
}

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api
