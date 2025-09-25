"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Badge } from "../../shared/ui/badge"
import { ArrowLeft, Clock, Target, Zap, BookOpen, Play, Star, Timer, Shuffle } from "lucide-react"
import { BottomNavigation } from "../../shared/components/bottom-navigation"

interface PracticeMode {
  id: string
  title: string
  description: string
  icon: ReactNode
  difficulty: "easy" | "medium" | "hard"
  duration: string
  type: "flashcards" | "quiz" | "timed" | "review"
}

interface PracticeHubProps {
  onBack: () => void
  onStartPractice: (mode: string) => void
  onNavigate?: (section: string) => void
}

export function PracticeHub({ onBack, onStartPractice, onNavigate }: PracticeHubProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [practiceStats, setPracticeStats] = useState({
    totalPracticeTime: 0,
    signsReviewed: 0,
    accuracy: 0,
    streak: 0,
  })
  const [practiceModes, setPracticeModes] = useState<PracticeMode[]>([])

  // Load practice data from local demo content
  useEffect(() => {
    setPracticeStats({
      totalPracticeTime: 8,
      signsReviewed: 24,
      accuracy: 78,
      streak: 2,
    })
    const demoModes: PracticeMode[] = [
      { id: 'flashcards-quick', title: 'Flashcards nhanh', description: 'Ôn nhanh 10 ký hiệu', icon: <Zap className="w-5 h-5" />, difficulty: 'easy', duration: '3-5m', type: 'flashcards' },
      { id: 'quiz-basic', title: 'Quiz cơ bản', description: '10 câu hỏi trắc nghiệm', icon: <Target className="w-5 h-5" />, difficulty: 'medium', duration: '5-8m', type: 'quiz' },
      { id: 'timed-30', title: 'Thử thách 30s', description: 'Trả lời thật nhanh!', icon: <Timer className="w-5 h-5" />, difficulty: 'hard', duration: '0.5m', type: 'timed' },
      { id: 'review-random', title: 'Ôn ngẫu nhiên', description: 'Tổng hợp nhiều chủ đề', icon: <Shuffle className="w-5 h-5" />, difficulty: 'medium', duration: '5-10m', type: 'review' },
    ]
    setPracticeModes(demoModes)
  }, [])

  const [categories] = useState([
    { id: "all", name: "All Categories" },
    { id: "greetings", name: "Greetings" },
    { id: "courtesy", name: "Courtesy" },
    { id: "questions", name: "Questions" },
    { id: "family", name: "Family" },
  ])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Practice Hub</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Practice Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.totalPracticeTime}m</div>
                <div className="text-sm text-muted-foreground">Practice Time</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.signsReviewed}</div>
                <div className="text-sm text-muted-foreground">Signs Reviewed</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Choose Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Practice Modes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Practice Modes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {practiceModes.map((mode) => (
              <Card
                key={mode.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onStartPractice(mode.id)}
              >
                <div className="space-y-4">
                  {/* Mode Icon and Title */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {mode.icon}
                    </div>
                    <Badge className={getDifficultyColor(mode.difficulty)}>{mode.difficulty}</Badge>
                  </div>

                  {/* Mode Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{mode.title}</h3>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                  </div>

                  {/* Duration and Start Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {mode.duration}
                    </div>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Practice */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Continue Recent Practice</h2>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Greetings Review</h3>
                <p className="text-sm text-muted-foreground">You were practicing basic greetings</p>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-32 h-2" />
                  <span className="text-sm text-muted-foreground">65% complete</span>
                </div>
              </div>
              <Button onClick={() => onStartPractice("continue-greetings")}>
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </Card>
        </div>

        {/* Daily Goal */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Daily Practice Goal</h3>
                <p className="text-sm text-muted-foreground">Keep up your learning streak!</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">8/15</div>
                <div className="text-sm text-muted-foreground">minutes</div>
              </div>
            </div>
            <Progress value={53} className="h-3" />
            <p className="text-sm text-muted-foreground">7 more minutes to reach your daily goal</p>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentSection="practice" onNavigate={onNavigate || (() => {})} />
    </div>
  )
}
