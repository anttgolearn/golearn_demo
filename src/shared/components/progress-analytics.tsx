"use client"

import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Trophy,
  Star,
  Zap,
  BookOpen
} from "lucide-react"

interface ProgressAnalyticsProps {
  userStats: {
    totalXP: number
    currentStreak: number
    longestStreak: number
    lessonsCompleted: number
    totalLessons: number
    weeklyMinutes: number[]
    achievements: string[]
    currentLevel: number
  }
  onBack?: () => void
}

export function ProgressAnalytics({ userStats, onBack }: ProgressAnalyticsProps) {
  const weeklyData = userStats.weeklyMinutes
  const maxMinutes = Math.max(...weeklyData)
  const totalMinutes = weeklyData.reduce((sum, minutes) => sum + minutes, 0)
  const averageMinutes = Math.round(totalMinutes / weeklyData.length)

  const achievements = [
    { id: "first-lesson", name: "First Steps", description: "Complete your first lesson", icon: "🎯", unlocked: userStats.achievements.includes("first-lesson") },
    { id: "week-streak", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", unlocked: userStats.achievements.includes("week-streak") },
    { id: "hundred-xp", name: "Century Club", description: "Earn 100 XP", icon: "💯", unlocked: userStats.achievements.includes("hundred-xp") },
    { id: "speed-demon", name: "Speed Demon", description: "Complete 5 lessons in one day", icon: "⚡", unlocked: false },
    { id: "perfectionist", name: "Perfectionist", description: "Get 100% on 10 quizzes", icon: "⭐", unlocked: false },
    { id: "marathon", name: "Marathon Runner", description: "Study for 2 hours straight", icon: "🏃", unlocked: false },
  ]

  const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Analytics</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{userStats.totalXP}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{userStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{userStats.lessonsCompleted}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{totalMinutes}m</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Weekly Activity</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Average: {averageMinutes} min/day</span>
              <span>Total: {totalMinutes} min</span>
            </div>
            
            <div className="flex items-end space-x-2 h-32">
              {weeklyData.map((minutes, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-muted rounded-t flex flex-col justify-end">
                    <div 
                      className="bg-primary rounded-t transition-all duration-500"
                      style={{ 
                        height: `${maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0}%`,
                        minHeight: minutes > 0 ? '4px' : '0px'
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{weeklyDays[index]}</div>
                  <div className="text-xs font-medium text-foreground">{minutes}m</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Course Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Course Progress</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="text-foreground">{userStats.lessonsCompleted} / {userStats.totalLessons}</span>
              </div>
              <Progress value={(userStats.lessonsCompleted / userStats.totalLessons) * 100} className="h-3" />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((userStats.lessonsCompleted / userStats.totalLessons) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </Card>

          {/* Level Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Level Progress</h3>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Level {userStats.currentLevel}</div>
                <div className="text-sm text-muted-foreground">Sign Language Learner</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP to Next Level</span>
                  <span className="text-foreground">{100 - (userStats.totalXP % 100)} XP</span>
                </div>
                <Progress value={(userStats.totalXP % 100)} className="h-3" />
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? "text-muted-foreground" : "text-muted-foreground/70"
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Study Insights */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Study Insights</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">This Week</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Most Active Day:</span>
                  <span className="text-foreground">
                    {weeklyDays[weeklyData.indexOf(Math.max(...weeklyData))]}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average Session:</span>
                  <span className="text-foreground">{averageMinutes} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Study Time:</span>
                  <span className="text-foreground">{totalMinutes} minutes</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">All Time</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Longest Streak:</span>
                  <span className="text-foreground">{userStats.longestStreak} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total XP Earned:</span>
                  <span className="text-foreground">{userStats.totalXP} points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Level:</span>
                  <span className="text-foreground">Level {userStats.currentLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
