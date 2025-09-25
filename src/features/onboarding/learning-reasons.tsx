"use client"

import type { ReactNode } from "react"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { OnboardingLayout } from "./onboarding-layout"
import { cn } from "../../lib/utils"

interface LearningReason {
  id: string
  label: string
  icon: ReactNode
  description: string
}

// Demo learning reasons (no API)
const reasons: LearningReason[] = [
  { id: 'career', label: 'Phục vụ công việc', icon: <span>💼</span>, description: 'Giao tiếp với đồng nghiệp/khách hàng khiếm thính' },
  { id: 'family', label: 'Gia đình/bạn bè', icon: <span>👨‍👩‍👧‍👦</span>, description: 'Kết nối với người thân, bạn bè dùng NNKH' },
  { id: 'volunteer', label: 'Tình nguyện/cộng đồng', icon: <span>🤝</span>, description: 'Hỗ trợ hoạt động cộng đồng cho người khiếm thính' },
  { id: 'study', label: 'Học tập/nghiên cứu', icon: <span>📚</span>, description: 'Bổ sung kỹ năng/kiến thức về ngôn ngữ ký hiệu' },
  { id: 'interest', label: 'Sở thích cá nhân', icon: <span>✨</span>, description: 'Đơn giản vì bạn thấy thú vị và muốn học' },
]

interface LearningReasonsProps {
  onNext: (selectedReasons: string[]) => void
  onBack?: () => void
}

export function LearningReasons({ onNext, onBack: _onBack }: LearningReasonsProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize local demo data
  useEffect(() => {
    setLoading(false)
    setError(null)
  }, [])

  const toggleReason = (reasonId: string) => {
    setSelectedReasons((prev) => (prev.includes(reasonId) ? prev.filter((id) => id !== reasonId) : [...prev, reasonId]))
  }

  const handleNext = () => {
    onNext(selectedReasons)
  }

  if (loading) {
    return (
      <OnboardingLayout
        progress={{ current: 3, total: 6 }}
        title="Vì sao bạn muốn học Ngôn ngữ Ký hiệu?"
        onNext={handleNext}
        onBack={_onBack}
        nextButtonDisabled={true}
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
        progress={{ current: 3, total: 6 }}
        title="Vì sao bạn muốn học Ngôn ngữ Ký hiệu?"
        onNext={handleNext}
        onBack={_onBack}
        nextButtonDisabled={true}
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
      progress={{ current: 3, total: 6 }}
      title="Vì sao bạn muốn học Ngôn ngữ Ký hiệu?"
      onNext={handleNext}
      onBack={_onBack}
      nextButtonDisabled={selectedReasons.length === 0}
    >
      {/* Reason Options */}
      <div className="space-y-3">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => toggleReason(reason.id)}
            className={cn(
              "w-full p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
              "flex items-center justify-between text-left",
              selectedReasons.includes(reason.id)
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md",
            )}
          >
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                  selectedReasons.includes(reason.id)
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600",
                )}
              >
                <div className="w-6 h-6">{reason.icon}</div>
              </div>
              <div className="min-w-0">
                <div className={cn(
                  "font-semibold text-base",
                  selectedReasons.includes(reason.id)
                    ? "text-gray-800"
                    : "text-gray-700"
                )}>{reason.label}</div>
                <div className="text-sm text-gray-500">{reason.description}</div>
              </div>
            </div>
            {selectedReasons.includes(reason.id) && (
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
