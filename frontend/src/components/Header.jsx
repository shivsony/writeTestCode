import React from 'react'
import { Link } from 'react-router-dom'
import { Home, TestTube, Play, BarChart3 } from 'lucide-react'
import { useNavigation } from '../hooks/useNavigation'

export default function Header() {
  const { isCurrentPath } = useNavigation()
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'generate', label: 'Generate Tests', icon: TestTube, path: '/generate' },
    { id: 'run', label: 'Run Tests', icon: Play, path: '/run' },
    { id: 'results', label: 'Results', icon: BarChart3, path: '/results' }
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <TestTube className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Test Automation Assistant
            </h1>
          </Link>
          
          <nav className="flex space-x-1">
            {tabs.map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isCurrentPath(path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
