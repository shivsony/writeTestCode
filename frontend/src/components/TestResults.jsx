import React, { useState, useEffect } from 'react'
import { getAllResults } from '../services/api'
import TestResultCard from './TestResultCard'
import { RefreshCw, Filter, BarChart3 } from 'lucide-react'

export default function TestResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    passed: 0,
    failed: 0,
    pending: 0
  })

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    setLoading(true)
    try {
      const response = await getAllResults()
      setResults(response.data)
      calculateStats(response.data)
    } catch (error) {
      console.error('Failed to load results:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (testResults) => {
    const stats = {
      total: testResults.length,
      passed: testResults.filter(r => r.status === 'passed').length,
      failed: testResults.filter(r => r.status === 'failed').length,
      pending: testResults.filter(r => r.status === 'pending').length
    }
    setStats(stats)
  }

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true
    return result.status === filter
  })

  const getFilterColor = (status) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Test Results Dashboard
          </h2>
          <button
            onClick={loadResults}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Total Tests</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Passed</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.passed}</p>
          </div>
          
          <div className="bg-white border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Failed</span>
            </div>
            <p className="text-2xl font-bold text-red-600 mt-1">{stats.failed}</p>
          </div>
          
          <div className="bg-white border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          <div className="flex space-x-2">
            {['all', 'passed', 'failed', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === status
                    ? getFilterColor(status)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="card">
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-primary-600" />
            <span className="ml-2 text-gray-600">Loading results...</span>
          </div>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <TestResultCard key={result.testId} result={result} />
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No test results found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Run some tests to see results here.'
                : `No tests with status "${filter}" found.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
