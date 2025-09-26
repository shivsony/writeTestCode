import React, { useState } from 'react'
import { useTest } from '../context/TestContext'
import { useNavigation } from '../hooks/useNavigation'
import { generateTests, generateEdgeCases } from '../services/api'
import ManualTestCard from './ManualTestCard'
import PlaywrightTestCard from './PlaywrightTestCard'
import EdgeCaseCard from './EdgeCaseCard'
import { Loader2, FileText, Code, AlertTriangle, ArrowRight } from 'lucide-react'

export default function TestGenerator() {
  const { state, dispatch } = useTest()
  const { goToRun } = useNavigation()
  const [baseURL, setBaseURL] = useState('http://localhost:3002')

  const handleGenerateAll = async () => {
    if (!state.userStory.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a user story' })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })

    try {
      const response = await generateTests(state.userStory, baseURL)
      dispatch({ type: 'SET_ALL_TESTS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const handleGenerateEdgeCases = async () => {
    if (!state.userStory.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a user story' })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await generateEdgeCases(state.userStory)
      dispatch({ type: 'SET_EDGE_CASES', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Generate Test Cases
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="userStory" className="block text-sm font-medium text-gray-700 mb-2">
              User Story or Requirement
            </label>
            <textarea
              id="userStory"
              value={state.userStory}
              onChange={(e) => dispatch({ type: 'SET_USER_STORY', payload: e.target.value })}
              placeholder="As a user, I want to reset my password so I can regain access to my account..."
              className="input-field h-32 resize-none"
            />
          </div>
          
          <div>
            <label htmlFor="baseURL" className="block text-sm font-medium text-gray-700 mb-2">
              Base URL (for Playwright tests)
            </label>
            <input
              id="baseURL"
              type="url"
              value={baseURL}
              onChange={(e) => setBaseURL(e.target.value)}
              placeholder="https://demo.example.com"
              className="input-field"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGenerateAll}
              disabled={state.loading}
              className="btn-primary flex items-center space-x-2"
            >
              {state.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              <span>Generate All Tests</span>
            </button>
            
            <button
              onClick={handleGenerateEdgeCases}
              disabled={state.loading}
              className="btn-secondary flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Suggest Edge Cases</span>
            </button>
            
            {state.playwrightTest && (
              <button
                onClick={goToRun}
                className="btn-primary flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Run Generated Test</span>
              </button>
            )}
          </div>
        </div>
        
        {state.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{state.error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {state.manualTests.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Manual Test Cases ({state.manualTests.length})</span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {state.manualTests.map((test, index) => (
              <ManualTestCard key={index} test={test} />
            ))}
          </div>
        </div>
      )}

      {state.playwrightTest && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Playwright Test Script</span>
          </h3>
          <PlaywrightTestCard test={state.playwrightTest} />
        </div>
      )}

      {state.edgeCases.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Edge Cases & Negative Scenarios ({state.edgeCases.length})</span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {state.edgeCases.map((edgeCase, index) => (
              <EdgeCaseCard key={index} edgeCase={edgeCase} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
