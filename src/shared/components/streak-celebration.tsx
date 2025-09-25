"use client"

import { useState, useEffect } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Trophy, Star, Zap, Target } from "lucide-react"

interface StreakCelebrationProps {
  streak: number
  onContinue: () => void
}

export function StreakCelebration({ streak, onContinue }: StreakCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getStreakMessage = () => {
    if (streak >= 30) return "Incredible! You're a sign language master!"
    if (streak >= 14) return "Amazing! Two weeks of dedication!"
    if (streak >= 7) return "Fantastic! One week strong!"
    if (streak >= 3) return "Great job! Keep the momentum going!"
    return "Nice start! Every day counts!"
  }

  const getStreakIcon = () => {
    if (streak >= 30) return "🏆"
    if (streak >= 14) return "🔥"
    if (streak >= 7) return "⭐"
    if (streak >= 3) return "💪"
    return "🎯"
  }

  const getStreakColor = () => {
    if (streak >= 30) return "from-yellow-400 to-orange-500"
    if (streak >= 14) return "from-red-400 to-pink-500"
    if (streak >= 7) return "from-blue-400 to-purple-500"
    if (streak >= 3) return "from-green-400 to-blue-500"
    return "from-primary to-accent"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl relative overflow-hidden">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        <div className="p-8 text-center space-y-8 relative z-10">
          {/* Celebration Icon */}
          <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${getStreakColor()} rounded-full flex items-center justify-center shadow-lg ${
            animationPhase === 0 ? "scale-110" : animationPhase === 1 ? "scale-100" : "scale-105"
          } transition-transform duration-500`}>
            <div className="text-4xl animate-pulse">{getStreakIcon()}</div>
          </div>

          {/* Streak Number */}
          <div className="space-y-2">
            <div className="text-6xl font-bold text-foreground animate-pulse">
              {streak}
            </div>
            <div className="text-xl font-semibold text-muted-foreground">
              Day Streak!
            </div>
          </div>

          {/* Celebration Message */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {getStreakMessage()}
            </p>
          </div>

          {/* Achievement Badges */}
          <div className="flex justify-center space-x-4">
            {streak >= 3 && (
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">3 Days</span>
              </div>
            )}
            {streak >= 7 && (
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-muted-foreground">1 Week</span>
              </div>
            )}
            {streak >= 14 && (
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-muted-foreground">2 Weeks</span>
              </div>
            )}
            {streak >= 30 && (
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs text-muted-foreground">1 Month</span>
              </div>
            )}
          </div>

          {/* Motivational Quote */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <div className="text-sm">🦜</div>
              </div>
              <span className="text-sm font-medium text-foreground">Mano says:</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {streak >= 30 
                ? "You're an inspiration! Your dedication is truly remarkable!"
                : streak >= 14
                ? "Incredible persistence! You're becoming a sign language expert!"
                : streak >= 7
                ? "One week strong! You're building an amazing habit!"
                : "Every day you practice, you're getting closer to fluency!"
              }
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={onContinue}
            className={`w-full bg-gradient-to-r ${getStreakColor()} hover:opacity-90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg`}
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Keep Going!
          </Button>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-card rounded-lg">
              <div className="font-semibold text-foreground">{streak} days</div>
              <div className="text-muted-foreground">Current streak</div>
            </div>
            <div className="p-3 bg-card rounded-lg">
              <div className="font-semibold text-foreground">{streak * 10}</div>
              <div className="text-muted-foreground">XP earned</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
