"use client"

import React, { useState } from "react"
// Icons will be provided by API data
import { OnboardingLayout } from "../../features/onboarding/onboarding-layout"

interface Benefit {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

// Demo app benefits (no API)
const benefits: Benefit[] = [
  { id: 'b1', icon: <span>🎯</span>, title: 'Lộ trình rõ ràng', description: 'Học từng bước phù hợp với trình độ của bạn' },
  { id: 'b2', icon: <span>🧠</span>, title: 'Ôn luyện thông minh', description: 'Nhắc lại và đánh giá giúp ghi nhớ tốt hơn' },
  { id: 'b3', icon: <span>📹</span>, title: 'Video trực quan', description: 'Ví dụ minh họa bằng video sinh động' },
]

interface AppBenefitsProps {
  onNext: () => void
  onBack?: () => void
}

export function AppBenefits({ onNext, onBack: _onBack }: AppBenefitsProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize local demo data
  React.useEffect(() => {
    setLoading(false)
    setError(null)
  }, [])

  if (loading) {
    return (
      <OnboardingLayout
        progress={{ current: 4, total: 6 }}
        title="Đây là những lợi ích bạn sẽ nhận được"
        onNext={onNext}
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
        progress={{ current: 4, total: 6 }}
        title="Đây là những lợi ích bạn sẽ nhận được"
        onNext={onNext}
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
      progress={{ current: 4, total: 6 }}
      title="Đây là những lợi ích bạn sẽ nhận được"
      onNext={onNext}
      onBack={_onBack}
    >
      {/* Benefits List */}
      <div className="space-y-6">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-blue-600">{benefit.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  )
}
