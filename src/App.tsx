import { useEffect, useMemo, useState } from "react"
import { OnboardingFlow } from "./features/onboarding/onboarding-flow"
import { LearningFlow } from "./features/learning/learning-flow"
import Landing from "./app/pages/Landing"
import Dashboard from "./app/pages/Dashboard"
import Settings from "./app/pages/Settings"
import LessonDetail from "./app/pages/LessonDetail"
import ChapterOverviewScreen from "./screens/ChapterOverviewScreen/ChapterOverviewScreen"
import QuizScreen from "./screens/QuizScreen/QuizScreen"
import QuizResultDetailScreen from "./screens/QuizResultScreen/QuizResultDetailScreen"
import ReviewVocabScreen from "./screens/ReviewVocabScreen/ReviewVocabScreen"
import { getNextLessonWithChapterFallback } from "./lib/lesson-navigation"

type AppState =
  | "landing"
  | "onboarding"
  | "dashboard"
  | "learning"
  | "settings"
  | "lesson-detail"
  | "chapter-overview"
  | "quiz"
  | "quiz-result"
  | "review-vocab"

function App() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [currentLessonId, setCurrentLessonId] = useState<string>("1")
  const [currentChapterId, setCurrentChapterId] = useState<string>("1")
  const [lastQuizResult, setLastQuizResult] = useState<{ correct: number; total: number } | null>(null)
  const routes = useMemo(() => ({
    landing: "#/",
    onboarding: "#/onboarding",
    dashboard: "#/dashboard",
    learning: "#/learning",
    settings: "#/settings",
    "lesson-detail": `#/lesson/${currentLessonId}`,
    "chapter-overview": `#/chapter/${currentChapterId}`,
    quiz: `#/quiz/${currentLessonId}`,
    "quiz-result": `#/quiz/${currentLessonId}/result`,
    "review-vocab": `#/review-vocab/${currentLessonId}`,
  }), [currentLessonId, currentChapterId])

  const parseHashToState = (): AppState => {
    const hash = window.location.hash.replace(/^#/, "") || "/"
    if (hash.startsWith("/onboarding")) return "onboarding"
    if (hash.startsWith("/dashboard")) return "dashboard"
    if (hash.startsWith("/settings")) return "settings"
    if (hash.startsWith("/lesson")) {
      // Extract lesson ID from URL like /lesson/4
      const match = hash.match(/^\/lesson\/(\d+)/)
      if (match) {
        setCurrentLessonId(match[1])
      }
      return "lesson-detail"
    }
    if (hash.startsWith("/quiz/")) {
      const match = hash.match(/^\/quiz\/(.+?)(?:\/result)?$/)
      if (match && match[1]) setCurrentLessonId(decodeURIComponent(match[1]))
      if (hash.endsWith("/result")) return "quiz-result"
      return "quiz"
    }
    if (hash.startsWith("/review-vocab/")) {
      const match = hash.match(/^\/review-vocab\/(.+?)$/)
      if (match && match[1]) setCurrentLessonId(decodeURIComponent(match[1]))
      return "review-vocab"
    }
    if (hash.startsWith("/chapter")) {
      const match = hash.match(/^\/chapter\/(\d+)/)
      if (match) {
        setCurrentChapterId(match[1])
      }
      return "chapter-overview"
    }
    if (hash.startsWith("/learning")) return "learning"
    return "landing"
  }

  const navigate = (state: AppState, id?: string) => {
    if (state === "lesson-detail" && id) setCurrentLessonId(id)
    if (state === "chapter-overview" && id) setCurrentChapterId(id)
    if (state === "quiz" && id) setCurrentLessonId(id)
    if (state === "review-vocab" && id) setCurrentLessonId(id)
    setAppState(state)
    const url = state === "lesson-detail" && id
      ? `#/lesson/${id}`
      : state === "chapter-overview" && id
        ? `#/chapter/${id}`
        : state === "quiz" && id
          ? `#/quiz/${encodeURIComponent(id)}`
          : state === "quiz-result"
            ? `#/quiz/${currentLessonId}/result`
            : state === "review-vocab" && id
              ? `#/review-vocab/${encodeURIComponent(id)}`
        : routes[state]
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

  const handleGoToSettings = () => navigate("settings")

  const handleGoToChapterOverview = (chapterId: string) => navigate("chapter-overview", chapterId)

  const handleStartLessonFromChapter = (lessonId: string) => navigate("quiz", lessonId)

  const handleQuizFinished = (result: { correct: number; total: number }) => {
    setLastQuizResult(result)
    navigate("quiz-result")
  }

  const handleNextAfterResult = () => {
    // Get the next lesson using proper navigation logic
    const nextLesson = getNextLessonWithChapterFallback(currentLessonId)
    
    if (nextLesson) {
      // Navigate to next lesson
      setCurrentLessonId(nextLesson.id)
      navigate("quiz", nextLesson.id)
    } else {
      // No more lessons, go back to chapter overview
      navigate("chapter-overview", currentChapterId)
    }
  }

  const handleLogout = () => navigate("landing")

  if (appState === "landing") {
    return <Landing onGetStarted={handleGetStarted} onGoToDashboard={handleGoToDashboard} />
  }

  if (appState === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  if (appState === "dashboard") {
    return <Dashboard onGoToSettings={handleGoToSettings} onGoToChapterOverview={handleGoToChapterOverview} onLogout={handleLogout} />
  }

  if (appState === "settings") {
    return <Settings onBackToDashboard={handleBackToDashboard} />
  }

  if (appState === "lesson-detail") {
    return <LessonDetail lessonId={currentLessonId} onBackToDashboard={handleBackToDashboard} />
  }

  if (appState === "chapter-overview") {
    return <ChapterOverviewScreen onOpenLesson={handleStartLessonFromChapter} />
  }

  if (appState === "quiz") {
    return <QuizScreen lessonId={currentLessonId} onFinish={handleQuizFinished} />
  }

  if (appState === "quiz-result") {
    return (
      <QuizResultDetailScreen 
        correct={lastQuizResult?.correct || 0}
        total={lastQuizResult?.total || 0}
        onRetry={() => navigate("quiz", currentLessonId)}
        onContinue={handleNextAfterResult}
        lessonId={currentLessonId}
      />
    )
  }

  if (appState === "review-vocab") {
    return (
      <ReviewVocabScreen 
        lessonId={currentLessonId}
        onContinue={handleNextAfterResult}
        onBack={() => navigate("quiz-result")}
      />
    )
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
