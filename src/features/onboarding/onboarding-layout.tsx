"use client"

import { ReactNode } from "react"
import { Card } from "../../shared/ui/card"
import { Button } from "../../shared/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface OnboardingLayoutProps {
  children: ReactNode
  progress: {
    current: number
    total: number
  }
  title: string
  onNext?: () => void
  onBack?: () => void
  nextButtonText?: string
  nextButtonDisabled?: boolean
  showBackButton?: boolean
}

export function OnboardingLayout({
  children,
  progress,
  title,
  onNext,
  onBack,
  nextButtonText = "Tiếp tục",
  nextButtonDisabled = false,
  showBackButton = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-gray-200/60 shadow-2xl rounded-3xl">
        <div className="p-6 pb-24 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-600">
              {progress.current}/{progress.total}
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: progress.total }, (_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-8 h-2 rounded-full",
                    index < progress.current ? "bg-blue-500" : "bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 text-balance leading-tight">
              {title}
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200/60 rounded-b-3xl">
          <div className="flex gap-3">
            {showBackButton && onBack && (
              <Button 
                variant="outline" 
                className="w-1/3 text-sm font-medium border-gray-300 text-gray-600 hover:bg-gray-50" 
                onClick={onBack}
              >
                Quay lại
              </Button>
            )}
            {onNext && (
              <Button 
                onClick={onNext} 
                disabled={nextButtonDisabled}
                className={cn(
                  "text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed",
                  showBackButton && onBack ? "flex-1" : "w-full"
                )}
              >
                {nextButtonText}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

