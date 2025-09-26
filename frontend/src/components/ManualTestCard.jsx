import React from 'react'
import { Clock, Flag, Tag } from 'lucide-react'

export default function ManualTestCard({ test }) {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
          {test.title}
        </h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
          {test.priority || 'Medium'}
        </span>
      </div>
      
      {test.preconditions && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Preconditions:</p>
          <p className="text-sm text-gray-700">{test.preconditions}</p>
        </div>
      )}
      
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-600 mb-2">Steps:</p>
        <ol className="text-sm text-gray-700 space-y-1">
          {test.steps?.map((step, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-600 mb-1">Expected Result:</p>
        <p className="text-sm text-gray-700">{test.expected}</p>
      </div>
      
      {test.tags && test.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {test.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
