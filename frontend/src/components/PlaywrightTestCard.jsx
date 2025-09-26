import React, { useState } from 'react'
import { Copy, Check, Play, Code2, Globe } from 'lucide-react'

export default function PlaywrightTestCard({ test }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(test.testCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleRunTest = () => {
    // This will be implemented in the TestRunner component
    console.log('Run test:', test)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code2 className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-semibold text-gray-900">Playwright Test Script</h4>
              <p className="text-sm text-gray-600 flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>{test.baseURL}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            
            <button
              onClick={handleRunTest}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run Test</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <span className="text-sm text-gray-300">test.spec.js</span>
          </div>
          <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
            <code>{test.testCode}</code>
          </pre>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This test script is ready to run. Make sure your target application 
            is accessible at the specified base URL before executing the test.
          </p>
        </div>
      </div>
    </div>
  )
}
