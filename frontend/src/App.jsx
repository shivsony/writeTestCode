import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TestGenerator from './components/TestGenerator'
import TestResults from './components/TestResults'
import TestRunner from './components/TestRunner'
import NotFound from './pages/NotFound'
import { TestProvider } from './context/TestContext'

function App() {
  return (
    <TestProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="generate" element={<TestGenerator />} />
            <Route path="run" element={<TestRunner />} />
            <Route path="results" element={<TestResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </TestProvider>
  )
}

export default App
