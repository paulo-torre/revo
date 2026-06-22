import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PostTrainingPage from './pages/PostTrainingPage'
import ProgressPage from './pages/ProgressPage'
import SignupPage from './pages/SignupPage'
import TrainingPage from './pages/TrainingPage'
import './App.css'

function App() {
  const path = window.location.pathname

  if (path === '/login') {
    return <LoginPage />
  }

  if (path === '/signup') {
    return <SignupPage />
  }

  if (path === '/inicio') {
    return <HomePage />
  }

  if (path === '/training') {
    return <TrainingPage />
  }

  if (path === '/pos-training') {
    return <PostTrainingPage />
  }

  if (path === '/progress') {
    return <ProgressPage />
  }

  return <LandingPage />
}

export default App
