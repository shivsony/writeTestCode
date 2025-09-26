import React, { useState } from 'react'
import Header from './components/Header'
import TestGenerator from './components/TestGenerator'
import TestResults from './components/TestResults'
import TestRunner from './components/TestRunner'
import { TestProvider } from './context/TestContext'

function App() {
  const [activeTab, setActiveTab] = useState('generate')

  return (
    <TestProvider>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'generate' && <TestGenerator />}
          {activeTab === 'run' && <TestRunner />}
          {activeTab === 'results' && <TestResults />}
        </main>
      </div>
    </TestProvider>
  )
}

export default App
