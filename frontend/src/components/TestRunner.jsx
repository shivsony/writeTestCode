import React, { useState, useEffect } from 'react'
import { useTest } from '../context/TestContext'
import { runTest, getAllResults } from '../services/api'
import TestResultCard from './TestResultCard'
import { Play, RefreshCw, Loader2, AlertCircle } from 'lucide-react'

export default function TestRunner() {
  const { state, dispatch } = useTest()
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      const response = await getAllResults()
      setResults(response.data)
    } catch (error) {
      console.error('Failed to load results:', error)
    }
  }

  const handleRunTest = async () => {
    if (!state.playwrightTest?.testCode) {
      dispatch({ type: 'SET_ERROR', payload: 'No Playwright test available. Please generate a test first.' })
      return
    }

    setRunning(true)
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      const response = await runTest(state.playwrightTest.testCode, 'generated-test')
      dispatch({ type: 'ADD_TEST_RESULT', payload: response.data })
      await loadResults() // Refresh results list
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      setRunning(false)
    }
  }

  const handleRunCustomTest = async (testCode, testName) => {
    setRunning(true)
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      const response = await runTest(testCode, testName)
      dispatch({ type: 'ADD_TEST_RESULT', payload: response.data })
      await loadResults() // Refresh results list
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Run Test Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Run Playwright Tests
        </h2>
        
        {state.playwrightTest ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Test Ready</span>
              </div>
              <p className="text-sm text-green-700">
                A Playwright test has been generated and is ready to run.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRunTest}
                disabled={running}
                className="btn-primary flex items-center space-x-2"
              >
                {running ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{running ? 'Running Test...' : 'Run Generated Test'}</span>
              </button>
              
              <button
                onClick={loadResults}
                className="btn-secondary flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Results</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">No Test Available</span>
            </div>
            <p className="text-sm text-yellow-700">
              Please generate a Playwright test first by going to the "Generate Tests" tab.
            </p>
          </div>
        )}
        
        {state.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{state.error}</p>
          </div>
        )}
      </div>

      {/* Custom Test Runner */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Run Custom Test
        </h3>
        <CustomTestRunner onRunTest={handleRunCustomTest} running={running} />
      </div>

      {/* Test Results */}
      {results.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Test Results ({results.length})
          </h3>
          <div className="space-y-4">
            {results.map((result) => (
              <TestResultCard key={result.testId} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CustomTestRunner({ onRunTest, running }) {
  const [testCode, setTestCode] = useState('')
  const [testName, setTestName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (testCode.trim() && testName.trim()) {
      onRunTest(testCode, testName)
      setTestCode('')
      setTestName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">
          Test Name
        </label>
        <input
          id="testName"
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="e.g., login-test"
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label htmlFor="testCode" className="block text-sm font-medium text-gray-700 mb-2">
          Playwright Test Code
        </label>
        <textarea
          id="testCode"
          value={testCode}
          onChange={(e) => setTestCode(e.target.value)}
          placeholder="import { test, expect } from '@playwright/test';\n\ntest('my test', async ({ page }) => {\n  // Your test code here\n});"
          className="input-field h-40 font-mono text-sm"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={running || !testCode.trim() || !testName.trim()}
        className="btn-primary flex items-center space-x-2"
      >
        {running ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Play className="w-4 h-4" />
        )}
        <span>{running ? 'Running...' : 'Run Custom Test'}</span>
      </button>
    </form>
  )
}
