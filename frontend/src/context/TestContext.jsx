import React, { createContext, useContext, useReducer } from 'react'

const TestContext = createContext()

const initialState = {
  userStory: '',
  manualTests: [],
  playwrightTest: null,
  testResults: [],
  edgeCases: [],
  loading: false,
  error: null
}

function testReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_STORY':
      return { ...state, userStory: action.payload }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_MANUAL_TESTS':
      return { ...state, manualTests: action.payload, loading: false }
    
    case 'SET_PLAYWRIGHT_TEST':
      return { ...state, playwrightTest: action.payload, loading: false }
    
    case 'SET_EDGE_CASES':
      return { ...state, edgeCases: action.payload, loading: false }
    
    case 'ADD_TEST_RESULT':
      return { 
        ...state, 
        testResults: [action.payload, ...state.testResults],
        loading: false 
      }
    
    case 'SET_ALL_TESTS':
      return {
        ...state,
        manualTests: action.payload.manualTests || [],
        playwrightTest: action.payload.playwrightTest || null,
        edgeCases: action.payload.edgeCases || [],
        loading: false
      }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    default:
      return state
  }
}

export function TestProvider({ children }) {
  const [state, dispatch] = useReducer(testReducer, initialState)

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  )
}

export function useTest() {
  const context = useContext(TestContext)
  if (!context) {
    throw new Error('useTest must be used within a TestProvider')
  }
  return context
}
