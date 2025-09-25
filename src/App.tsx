import { useEffect, useMemo, useState } from "react"
import { OnboardingFlow } from "./features/onboarding/onboarding-flow"
import { LearningFlow } from "./features/learning/learning-flow"
import Landing from "./app/pages/Landing"
import Dashboard from "./app/pages/Dashboard"
import Profile from "./app/pages/Profile"
import Settings from "./app/pages/Settings"
import LessonDetail from "./app/pages/LessonDetail"

type AppState = "landing" | "onboarding" | "dashboard" | "learning" | "profile" | "settings" | "lesson-detail"

function App() {
  const [appState, setAppState] = useState<AppState>("landing")
  const routes = useMemo(() => ({
    landing: "#/",
    onboarding: "#/onboarding",
    dashboard: "#/dashboard",
    learning: "#/learning",
    profile: "#/profile",
    settings: "#/settings",
    "lesson-detail": "#/lesson/1"
  }), [])

  const parseHashToState = (): AppState => {
    const hash = window.location.hash.replace(/^#/, "") || "/"
    if (hash.startsWith("/onboarding")) return "onboarding"
    if (hash.startsWith("/dashboard")) return "dashboard"
    if (hash.startsWith("/profile")) return "profile"
    if (hash.startsWith("/settings")) return "settings"
    if (hash.startsWith("/lesson")) return "lesson-detail"
    if (hash.startsWith("/learning")) return "learning"
    return "landing"
  }

  const navigate = (state: AppState) => {
    setAppState(state)
    const url = routes[state]
    if (url) {
      window.location.hash = url
    }
  }

  useEffect(() => {
    // initialize from URL
    setAppState(parseHashToState())
    const onHashChange = () => setAppState(parseHashToState())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  const [userPreferences, setUserPreferences] = useState({
    firstName: "",
    language: "",
    goal: "",
    reasons: [] as string[],
    email: "",
    password: "",
  })

  const handleGetStarted = () => navigate("onboarding")

  const handleGoToDashboard = () => navigate("dashboard")

  const handleOnboardingComplete = (preferences: typeof userPreferences) => {
    setUserPreferences(preferences)
    // Sau signup → chuyển thẳng đến bài test; hoàn tất test sẽ về dashboard
    navigate("learning")
  }

  const handleBackToDashboard = () => navigate("dashboard")

  const handleGoToProfile = () => navigate("profile")

  const handleGoToSettings = () => navigate("settings")

  const handleGoToLessonDetail = () => navigate("lesson-detail")

  const handleLogout = () => navigate("landing")

  if (appState === "landing") {
    return <Landing onGetStarted={handleGetStarted} onGoToDashboard={handleGoToDashboard} />
  }

  if (appState === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  if (appState === "dashboard") {
    return <Dashboard onGoToProfile={handleGoToProfile} onGoToSettings={handleGoToSettings} onGoToLessonDetail={handleGoToLessonDetail} onLogout={handleLogout} />
  }

  if (appState === "profile") {
    return <Profile onBackToDashboard={handleBackToDashboard} />
  }

  if (appState === "settings") {
    return <Settings onBackToDashboard={handleBackToDashboard} />
  }

  if (appState === "lesson-detail") {
    return <LessonDetail onBackToDashboard={handleBackToDashboard} />
  }

  return (
    <LearningFlow 
      userPreferences={userPreferences}
      onComplete={handleBackToDashboard}
      startAt="quiz"
    />
  )
}

export default App
