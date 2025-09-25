"use client"

import { useState, useEffect } from "react"
import { LearningDashboard } from "../onboarding/learning-dashboard"
import { LessonInterface } from "./lesson-interface"
import { QuizInterface } from "../onboarding/quiz-interface"
import { PracticeHub } from "./practice-hub"
import { LessonResults } from "./lesson-results"
import { MirrorPractice } from "../onboarding/mirror-practice"
import { Dictionary } from "../../shared/components/dictionary"
import { ProfileSystem } from "../../shared/components/profile-system"
import { ProgressAnalytics } from "../../shared/components/progress-analytics"
import { StreakCelebration } from "../../shared/components/streak-celebration"

type LearningStep = 
  | "dashboard" 
  | "lesson" 
  | "quiz" 
  | "practice" 
  | "results" 
  | "mirror" 
  | "dictionary" 
  | "profile" 
  | "analytics" 
  | "celebration"

interface LearningFlowProps {
  userPreferences: {
    firstName: string
    language: string
    goal: string
    reasons: string[]
    email: string
    password: string
  }
  onComplete?: () => void
  startAt?: "dashboard" | "lesson" | "quiz"
}

export function LearningFlow({ userPreferences, onComplete, startAt = "dashboard" }: LearningFlowProps) {
  const [currentStep, setCurrentStep] = useState<LearningStep>(startAt === "quiz" ? "quiz" : startAt === "lesson" ? "lesson" : "dashboard")
  const [lessonProgress, setLessonProgress] = useState({
    currentLesson: 1,
    totalLessons: 50,
    completedLessons: 0,
    currentStreak: 0,
    totalXP: 0,
    accuracy: 0,
    timeSpent: 0
  })
  const [quizResults, setQuizResults] = useState<{
    score: number
    totalQuestions: number
  } | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLessonProgress(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleStartLesson = () => {
    setCurrentStep("lesson")
  }

  const handleLessonNext = () => {
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizResults({ score, totalQuestions })
    setCurrentStep("results")
    
    // Update progress
    setLessonProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      totalXP: prev.totalXP + score,
      accuracy: Math.round((score / totalQuestions) * 100),
      currentStreak: prev.currentStreak + 1
    }))

    // Show celebration for good scores
    if (score >= totalQuestions * 0.8) {
      setShowCelebration(true)
    }
  }

  const handleResultsNext = () => {
    setQuizResults(null)
    if (showCelebration) {
      setShowCelebration(false)
    }
    if (onComplete) {
      onComplete()
    } else {
      setCurrentStep("dashboard")
    }
  }

  const handleNavigate = (section: string) => {
    switch (section) {
      case "practice":
        setCurrentStep("practice")
        break
      case "dictionary":
        setCurrentStep("dictionary")
        break
      case "profile":
        setCurrentStep("profile")
        break
      case "analytics":
        setCurrentStep("analytics")
        break
      default:
        setCurrentStep("dashboard")
    }
  }

  const handleStartPractice = (_mode: string) => {
    setCurrentStep("quiz")
  }

  const handleMirrorPractice = () => {
    setCurrentStep("mirror")
  }

  const handleBack = () => {
    switch (currentStep) {
      case "lesson":
      case "quiz":
      case "practice":
      case "dictionary":
      case "profile":
      case "analytics":
      case "mirror":
        setCurrentStep("dashboard")
        break
      case "results":
        setCurrentStep("quiz")
        break
      default:
        setCurrentStep("dashboard")
    }
  }

  // Show celebration overlay
  if (showCelebration) {
    return (
      <StreakCelebration
        streak={lessonProgress.currentStreak}
        onContinue={handleResultsNext}
      />
    )
  }

  // Render current step
  switch (currentStep) {
    case "dashboard":
      return (
        <LearningDashboard
          userPreferences={userPreferences}
          onStartLesson={handleStartLesson}
          onNavigate={handleNavigate}
        />
      )

    case "lesson":
      return (
        <LessonInterface
          onNext={handleLessonNext}
          onMirrorPractice={handleMirrorPractice}
          onBack={handleBack}
        />
      )

    case "quiz":
      return (
        <QuizInterface
          onNext={handleResultsNext}
          onBack={handleBack}
          onComplete={handleQuizComplete}
          questionCount={10}
        />
      )

    case "practice":
      return (
        <PracticeHub
          onBack={handleBack}
          onStartPractice={handleStartPractice}
          onNavigate={handleNavigate}
        />
      )

    case "results":
      return (
        <LessonResults
          results={quizResults}
          onNext={handleResultsNext}
          onBack={handleBack}
        />
      )

    case "mirror":
      return (
        <MirrorPractice
          onBack={handleBack}
          onNext={handleBack}
        />
      )

    case "dictionary":
      return (
        <Dictionary
          onBack={handleBack}
        />
      )

    case "profile":
      return (
        <ProfileSystem
          userPreferences={userPreferences}
          progress={lessonProgress}
          onBack={handleBack}
        />
      )

    case "analytics":
      return (
        <ProgressAnalytics
          userStats={{
            totalXP: lessonProgress.totalXP,
            currentStreak: lessonProgress.currentStreak,
            longestStreak: lessonProgress.currentStreak,
            lessonsCompleted: lessonProgress.completedLessons,
            totalLessons: lessonProgress.totalLessons,
            weeklyMinutes: [15, 20, 0, 25, 18, 30, 12],
            achievements: ["first-lesson", "week-streak", "hundred-xp"],
            currentLevel: Math.floor(lessonProgress.totalXP / 100) + 1
          }}
          onBack={handleBack}
        />
      )

    default:
      return (
        <LearningDashboard
          userPreferences={userPreferences}
          onStartLesson={handleStartLesson}
          onNavigate={handleNavigate}
        />
      )
  }
}
