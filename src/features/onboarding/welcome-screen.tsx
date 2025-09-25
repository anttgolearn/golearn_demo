"use client"

import { useState } from "react"
import { OnboardingLayout } from "./onboarding-layout"

export function WelcomeScreen({ onNext }: { onNext?: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onNext?.()
    }, 300)
  }

  return (
    <OnboardingLayout
      progress={{ current: 1, total: 6 }}
      title=""
      onNext={handleNext}
      nextButtonText="Bắt đầu"
      showBackButton={false}
    >
      {/* App Logo/Brand */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
          <span className="text-2xl font-bold text-white">SL</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">GoLeản</h1>
      </div>

      {/* Mascot Character */}
      <div className="relative text-center">
        <div className={`transition-transform duration-500 ${isAnimating ? "scale-110" : "scale-100"}`}>
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-6xl">🦜</div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-balance">Xin chào, mình là Mano!</h2>
        <p className="text-base text-gray-600 text-pretty leading-relaxed px-2">
          Rất vui được gặp bạn! Hãy bắt đầu hành trình học Ngôn ngữ Ký hiệu cùng nhau. Mình sẽ đồng hành với bạn ở mỗi bước.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="flex justify-center space-x-2 pt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-200"></div>
      </div>
    </OnboardingLayout>
  )
}
