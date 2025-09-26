import React from 'react'
import { Link } from 'react-router-dom'
import { TestTube, Play, BarChart3, ArrowRight, Sparkles, Zap, Target } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: TestTube,
      title: 'Generate Tests',
      description: 'AI-powered generation of manual test cases and Playwright scripts from user stories',
      path: '/generate',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      icon: Play,
      title: 'Run Tests',
      description: 'Execute Playwright tests with real-time results and screenshot capture',
      path: '/run',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      icon: BarChart3,
      title: 'View Results',
      description: 'Comprehensive test results dashboard with filtering and analytics',
      path: '/results',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    }
  ]

  const stats = [
    { label: 'Test Cases Generated', value: '1000+', icon: Sparkles },
    { label: 'Tests Executed', value: '500+', icon: Zap },
    { label: 'Success Rate', value: '95%', icon: Target }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Test Automation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Transform User Stories
          <span className="block text-primary-600">Into Automated Tests</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Generate comprehensive test cases, create Playwright automation scripts, 
          and run tests with AI-powered insights and change detection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/generate"
            className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-3"
          >
            <TestTube className="w-5 h-5" />
            <span>Start Generating Tests</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/run"
            className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-3"
          >
            <Play className="w-5 h-5" />
            <span>Run Tests</span>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform streamlines the entire test automation workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`card border-2 hover:shadow-lg transition-all duration-200 hover:scale-105 ${feature.color}`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              
              <p className="text-gray-700 mb-4">{feature.description}</p>
              
              <div className="flex items-center text-sm font-medium">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Try the Demo</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test our AI Test Automation Assistant with a sample user story. 
            Generate manual test cases, create Playwright scripts, and see the results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generate"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Sample User Story</span>
            </Link>
            
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>View Demo App</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="card">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900">Enter User Story</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Describe your feature or requirement in natural language
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900">Generate Tests</h4>
            </div>
            <p className="text-gray-600 text-sm">
              AI creates manual test cases and Playwright automation scripts
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900">Run & Analyze</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Execute tests and view results with screenshots and insights
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
