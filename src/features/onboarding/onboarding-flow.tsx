"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
// import { LanguageSelection } from "./language-selection"
import { LearningGoals } from "./learning-goals"
import { LearningReasons } from "./learning-reasons"
import { AppBenefits } from "../../shared/components/app-benefits"
import { SignUpForm } from "./sign-up-form"

type OnboardingStep = "welcome" | "goals" | "reasons" | "benefits" | "signup"

interface OnboardingFlowProps {
  onComplete?: (preferences: {
    firstName: string
    language: string
    goal: string
    reasons: string[]
    email: string
    password: string
  }) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [userPreferences, setUserPreferences] = useState({
    language: "",
    goal: "",
    reasons: [] as string[],
    email: "",
    firstName: "",
    password: "",
  })

  const handleBack = () => {
    switch (currentStep) {
      case "goals":
        setCurrentStep("welcome")
        break
      case "reasons":
        setCurrentStep("goals")
        break
      case "benefits":
        setCurrentStep("reasons")
        break
      case "signup":
        setCurrentStep("benefits")
        break
      default:
        break
    }
  }

  const handleWelcomeNext = () => {
    setCurrentStep("goals")
  }

  // Bỏ lựa chọn ngôn ngữ, mặc định là VSL

  const handleGoalsNext = (selectedGoal: string) => {
    setUserPreferences((prev) => ({ ...prev, goal: selectedGoal }))
    setCurrentStep("reasons")
  }

  const handleReasonsNext = (selectedReasons: string[]) => {
    setUserPreferences((prev) => ({ ...prev, reasons: selectedReasons }))
    setCurrentStep("benefits")
  }

  const handleBenefitsNext = () => {
    setCurrentStep("signup")
  }

  const handleSignUpComplete = (userData: { email: string; firstName: string; password: string }) => {
    const updatedPreferences = { ...userPreferences, ...userData }
    setUserPreferences(updatedPreferences)
    // Tự động chuyển đến Dashboard sau khi signup thành công
    onComplete?.(updatedPreferences)
  }

  switch (currentStep) {
    case "welcome":
      return <WelcomeScreen onNext={handleWelcomeNext} />
    case "goals":
      return <LearningGoals onNext={handleGoalsNext} onBack={handleBack} />
    case "reasons":
      return <LearningReasons onNext={handleReasonsNext} onBack={handleBack} />
    case "benefits":
      return <AppBenefits onNext={handleBenefitsNext} onBack={handleBack} />
    case "signup":
      return <SignUpForm onComplete={handleSignUpComplete} onBack={handleBack} />
    default:
      return <WelcomeScreen onNext={handleWelcomeNext} />
  }
}
