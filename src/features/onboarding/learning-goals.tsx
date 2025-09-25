"use client"

import { useState } from "react"
import React from "react"
import { Check } from "lucide-react"
import { OnboardingLayout } from "./onboarding-layout"
import { cn } from "../../lib/utils"

interface LearningGoal {
  id: string
  label: string
  duration: string
}

// Demo learning goals (no API)
const goals: LearningGoal[] = [
  { id: '5m', label: '5m', duration: '5 phút mỗi ngày' },
  { id: '10m', label: '10m', duration: '10 phút mỗi ngày' },
  { id: '15m', label: '15m', duration: '15 phút mỗi ngày' },
  { id: '20m', label: '20m', duration: '20 phút mỗi ngày' },
]

interface LearningGoalsProps {
  onNext: (selectedGoal: string) => void
  onBack?: () => void
}

export function LearningGoals({ onNext, onBack: _onBack }: LearningGoalsProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize local demo data
  React.useEffect(() => {
    setLoading(false)
    setError(null)
    if (goals.length > 0) {
      setSelectedGoal(goals[0].id)
    }
  }, [])

  const handleNext = () => {
    onNext(selectedGoal)
  }

  if (loading) {
    return (
      <OnboardingLayout
        progress={{ current: 2, total: 6 }}
        title="Mục tiêu học mỗi ngày của bạn là gì?"
        onNext={handleNext}
        onBack={_onBack}
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Đang tải...</span>
        </div>
      </OnboardingLayout>
    )
  }

  if (error) {
    return (
      <OnboardingLayout
        progress={{ current: 2, total: 6 }}
        title="Mục tiêu học mỗi ngày của bạn là gì?"
        onNext={handleNext}
        onBack={_onBack}
      >
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">Lỗi tải dữ liệu: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </OnboardingLayout>
    )
  }

  return (
    <OnboardingLayout
      progress={{ current: 2, total: 6 }}
      title="Mục tiêu học mỗi ngày của bạn là gì?"
      onNext={handleNext}
      onBack={_onBack}
    >
      {/* Goal Options */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoal(goal.id)}
            className={cn(
              "w-full p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
              "flex items-center justify-between text-left truncate",
              selectedGoal === goal.id
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md",
            )}
          >
            <div className="flex items-center space-x-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                selectedGoal === goal.id 
                  ? "bg-blue-100" 
                  : "bg-gray-100"
              )}>
                <span className={cn(
                  "text-lg font-bold",
                  selectedGoal === goal.id 
                    ? "text-blue-600" 
                    : "text-gray-600"
                )}>{goal.label}</span>
              </div>
              <div className="min-w-0">
                <div className={cn(
                  "font-semibold text-base",
                  selectedGoal === goal.id 
                    ? "text-gray-800" 
                    : "text-gray-700"
                )}>{goal.duration}</div>
                <div className="text-sm text-gray-500">Luyện tập hằng ngày</div>
              </div>
            </div>
            {selectedGoal === goal.id && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </OnboardingLayout>
  )
}
