"use client"

import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Badge } from "../../shared/ui/badge"
import { Trophy, Target, ArrowLeft, ChevronRight, RotateCcw } from "lucide-react"

interface LessonResultsProps {
  results: {
    score: number
    totalQuestions: number
    category?: string
  } | null
  onNext: () => void
  onBack?: () => void
}

export function LessonResults({ results, onNext, onBack }: LessonResultsProps) {
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </Card>
      </div>
    )
  }

  const percentage = Math.round((results.score / results.totalQuestions) * 100)
  const isExcellent = percentage >= 90
  const isGood = percentage >= 70
  const isPassing = percentage >= 50

  const getPerformanceMessage = () => {
    if (isExcellent) return "Excellent work! You're mastering sign language!"
    if (isGood) return "Great job! You're making excellent progress!"
    if (isPassing) return "Good effort! Keep practicing to improve!"
    return "Don't give up! Practice makes perfect!"
  }

  const getPerformanceColor = () => {
    if (isExcellent) return "text-green-600"
    if (isGood) return "text-blue-600"
    if (isPassing) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceIcon = () => {
    if (isExcellent) return "🏆"
    if (isGood) return "⭐"
    if (isPassing) return "👍"
    return "💪"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {onBack && (
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {/* Results Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <div className="text-4xl">{getPerformanceIcon()}</div>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground">Lesson Complete!</h1>
            <div className={`text-4xl font-bold ${getPerformanceColor()}`}>{percentage}%</div>
            <p className="text-muted-foreground">{getPerformanceMessage()}</p>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Your Results</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{results.score}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{results.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="text-foreground">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            {/* Performance Badge */}
            <div className="flex justify-center">
              <Badge 
                className={`px-4 py-2 text-sm ${
                  isExcellent ? "bg-green-100 text-green-800" :
                  isGood ? "bg-blue-100 text-blue-800" :
                  isPassing ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}
              >
                {isExcellent ? "Excellent" : isGood ? "Good" : isPassing ? "Passing" : "Keep Trying"}
              </Badge>
            </div>
          </div>

          {/* Category Info */}
          {results.category && (
            <Card className="p-4 bg-muted/50 border-border">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">Category</h3>
                <Badge variant="outline" className="text-sm">
                  {results.category.charAt(0).toUpperCase() + results.category.slice(1)}
                </Badge>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onNext}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              Continue Learning
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            {!isExcellent && (
              <Button
                onClick={onNext}
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Practice More
              </Button>
            )}
          </div>

          {/* Encouragement Message */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <div className="text-xl">🦜</div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "Every sign you learn brings you closer to fluency!" - Mano
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
