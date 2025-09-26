import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb() {
  const location = useLocation()
  
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '')
  
  const getBreadcrumbLabel = (segment) => {
    switch (segment) {
      case 'generate':
        return 'Generate Tests'
      case 'run':
        return 'Run Tests'
      case 'results':
        return 'Results'
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }

  if (location.pathname === '/') {
    return null // Don't show breadcrumb on home page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link
        to="/"
        className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      
      {pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/')
        const isLast = index === pathSegments.length - 1
        
        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {getBreadcrumbLabel(segment)}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-primary-600 transition-colors"
              >
                {getBreadcrumbLabel(segment)}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
