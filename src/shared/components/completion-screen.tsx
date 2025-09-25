"use client"

import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

interface UserPreferences {
  language: string
  goal: string
  reasons: string[]
  email: string
  firstName: string
  password: string
}

interface CompletionScreenProps {
  userPreferences: UserPreferences
  onComplete?: (preferences: UserPreferences) => void
}

export function CompletionScreen({ userPreferences, onComplete }: CompletionScreenProps) {
  const handleStartLearning = () => {
    onComplete?.(userPreferences)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 text-center space-y-8">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Mascot Character */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
              <div className="text-6xl">🦜</div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-lg">👍</span>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground text-balance">Welcome, {userPreferences.firstName}!</h1>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Get ready to join 3 million people learning sign language with SignLearn. Your personalized learning
              journey is ready to begin!
            </p>
          </div>

          {/* User Preferences Summary */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <span className="font-medium text-foreground">{userPreferences.language.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Goal:</span>
              <span className="font-medium text-foreground">{userPreferences.goal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Learning For:</span>
              <span className="font-medium text-foreground">{userPreferences.reasons.join(", ")}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleStartLearning}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            size="lg"
          >
            Start Learning
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
