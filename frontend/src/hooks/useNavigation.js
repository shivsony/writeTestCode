import { useNavigate, useLocation } from 'react-router-dom'

export function useNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (path) => {
    navigate(path)
  }

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate('/')
  }

  const goToGenerate = () => {
    navigate('/generate')
  }

  const goToRun = () => {
    navigate('/run')
  }

  const goToResults = () => {
    navigate('/results')
  }

  const isCurrentPath = (path) => {
    return location.pathname === path
  }

  const isHomePage = () => {
    return location.pathname === '/'
  }

  const isGeneratePage = () => {
    return location.pathname === '/generate'
  }

  const isRunPage = () => {
    return location.pathname === '/run'
  }

  const isResultsPage = () => {
    return location.pathname === '/results'
  }

  return {
    goTo,
    goBack,
    goHome,
    goToGenerate,
    goToRun,
    goToResults,
    isCurrentPath,
    isHomePage,
    isGeneratePage,
    isRunPage,
    isResultsPage,
    currentPath: location.pathname
  }
}
