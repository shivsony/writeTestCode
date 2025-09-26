import React, { useState } from 'react'
import { CheckCircle, XCircle, Clock, Eye, Download, AlertTriangle } from 'lucide-react'

export default function TestResultCard({ result }) {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':
        return 'bg-green-50 border-green-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const downloadScreenshot = (screenshotUrl) => {
    const link = document.createElement('a')
    link.href = screenshotUrl
    link.download = `screenshot-${result.testId}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(result.status)}
          <div>
            <h4 className="font-semibold text-gray-900">
              {result.testName || 'Generated Test'}
            </h4>
            <p className="text-sm text-gray-600">
              {formatTimestamp(result.timestamp)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            result.status === 'passed' 
              ? 'bg-green-100 text-green-800'
              : result.status === 'failed'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {result.status}
          </span>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 px-2 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{showDetails ? 'Hide' : 'Show'} Details</span>
          </button>
        </div>
      </div>

      {result.error && (
        <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="font-medium text-red-800">Error</span>
          </div>
          <p className="text-sm text-red-700">{result.error}</p>
        </div>
      )}

      {showDetails && (
        <div className="space-y-4">
          {/* Logs */}
          {result.logs && result.logs.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Test Logs</h5>
              <div className="bg-gray-900 rounded-lg p-3 max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-100">
                  {result.logs.join('\n')}
                </pre>
              </div>
            </div>
          )}

          {/* Screenshots */}
          {result.screenshots && result.screenshots.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">
                Screenshots ({result.screenshots.length})
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => downloadScreenshot(screenshot)}
                        className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 px-2 py-1 bg-white text-gray-800 rounded-md text-sm transition-opacity"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Test ID:</span>
              <span className="ml-2 text-gray-600 font-mono">{result.testId}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="ml-2 text-gray-600">
                {result.duration ? `${result.duration}ms` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
