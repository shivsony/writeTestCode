import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="text-6xl font-bold text-primary-600">404</div>
        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track with your test automation journey.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Go Home</span>
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>

      <div className="card bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Pages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/generate"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Generate Tests</h4>
                <p className="text-sm text-gray-600">Create test cases from user stories</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/run"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Run Tests</h4>
                <p className="text-sm text-gray-600">Execute Playwright tests</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/results"
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">View Results</h4>
                <p className="text-sm text-gray-600">Check test execution results</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
