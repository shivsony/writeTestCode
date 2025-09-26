import React from 'react'
import { AlertTriangle, Flag } from 'lucide-react'

export default function EdgeCaseCard({ edgeCase }) {
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

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'security':
        return 'bg-red-50 border-red-200'
      case 'performance':
        return 'bg-orange-50 border-orange-200'
      case 'usability':
        return 'bg-blue-50 border-blue-200'
      case 'data validation':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getCategoryColor(edgeCase.category)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-orange-600" />
          <h4 className="font-semibold text-gray-900 text-sm">
            {edgeCase.title}
          </h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(edgeCase.priority)}`}>
          {edgeCase.priority || 'Medium'}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">
        {edgeCase.description}
      </p>
      
      {edgeCase.category && (
        <div className="flex items-center space-x-1">
          <Flag className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-600 font-medium">
            {edgeCase.category}
          </span>
        </div>
      )}
    </div>
  )
}
