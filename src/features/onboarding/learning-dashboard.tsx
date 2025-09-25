"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Badge } from "../../shared/ui/badge"
import {
  Trophy,
  Star,
  Clock,
  Target,
  Play,
  BarChart3,
  BookOpen,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Book,
  User,
} from "lucide-react"
import { ProgressAnalytics } from "../../shared/components/progress-analytics"
import { BottomNavigation } from "../../shared/components/bottom-navigation"

interface LearningDashboardProps {
  userPreferences: {
    firstName: string
    language: string
    goal: string
  }
  onStartLesson: () => void
  onNavigate?: (section: string) => void
}

export function LearningDashboard({ userPreferences, onStartLesson, onNavigate }: LearningDashboardProps) {
  const [currentStreak] = useState(3)
  const [totalLessons] = useState(250)
  const [completedLessons] = useState(12)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const progressPercentage = (completedLessons / totalLessons) * 100

  const userStats = {
    totalXP: 1240,
    currentStreak: currentStreak,
    longestStreak: 7,
    lessonsCompleted: completedLessons,
    totalLessons: totalLessons,
    weeklyMinutes: [15, 20, 0, 25, 18, 30, 12],
    achievements: ["first-lesson", "week-streak", "hundred-xp"],
    currentLevel: 3,
  }

  const recentActivity = [
    { type: "lesson", title: "Completed Greetings Quiz", time: "2 hours ago", score: 95 },
    { type: "practice", title: "Mirror Practice Session", time: "Yesterday", duration: "15 min" },
    { type: "achievement", title: "Earned Week Warrior badge", time: "2 days ago" },
  ]

  const quickActions = [
    { id: "practice", title: "Quick Practice", icon: <Zap className="w-5 h-5" />, description: "5 min review" },
    { id: "dictionary", title: "Dictionary", icon: <Book className="w-5 h-5" />, description: "Browse signs" },
    { id: "profile", title: "Profile", icon: <User className="w-5 h-5" />, description: "View stats" },
  ]

  if (showAnalytics) {
    return <ProgressAnalytics userStats={userStats} />
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto space-y-6 p-4">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {userPreferences.firstName}!</h1>
          <p className="text-muted-foreground">Ready to continue your {userPreferences.language} journey?</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
            {currentStreak > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1 text-primary">
                  <Trophy className="w-4 h-4" />
                  <span>{currentStreak} day streak!</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Level Progress Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Level {userStats.currentLevel}</h2>
                <p className="text-sm text-muted-foreground">Sign Language Learner</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                <TrendingUp className="w-3 h-3 mr-1" />
                {userStats.totalXP} XP
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {userStats.currentLevel + 1}</span>
                <span className="text-foreground">{userStats.totalXP} / 1500 XP</span>
              </div>
              <Progress value={(userStats.totalXP / 1500) * 100} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer group bg-card border-border"
              onClick={() => onNavigate?.(action.id)}
            >
              <div className="text-center space-y-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {action.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Card */}
        <Card className="p-6 bg-card border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Course Progress</h2>
              <div className="flex items-center space-x-1 text-primary">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedLessons} lessons completed</span>
              <span>{totalLessons - completedLessons} remaining</span>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">1,240</div>
                <div className="text-sm text-muted-foreground">XP Earned</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">45m</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-card border-border">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "lesson"
                          ? "bg-primary/10 text-primary"
                          : activity.type === "practice"
                            ? "bg-accent/10 text-accent"
                            : "bg-secondary/10 text-secondary"
                      }`}
                    >
                      {activity.type === "lesson" && <BookOpen className="w-4 h-4" />}
                      {activity.type === "practice" && <Zap className="w-4 h-4" />}
                      {activity.type === "achievement" && <Award className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  {activity.score && <Badge variant="secondary">{activity.score}%</Badge>}
                  {activity.duration && <Badge variant="outline">{activity.duration}</Badge>}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Button
          onClick={() => setShowAnalytics(true)}
          variant="outline"
          className="w-full border-primary/20 hover:bg-primary/5"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Detailed Analytics
        </Button>

        {/* Today's Goal */}
        <Card className="p-6 bg-card border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Today's Goal</h3>
                <p className="text-sm text-muted-foreground">{userPreferences.goal} daily practice</p>
              </div>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-sm text-muted-foreground">6 minutes completed of {userPreferences.goal}</p>
          </div>
        </Card>

        {/* Continue Learning */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">👋</div>
              <div>
                <h3 className="font-semibold text-foreground">Chapter 1: Greetings</h3>
                <p className="text-sm text-muted-foreground">Learn basic greeting signs</p>
              </div>
            </div>
            <Button
              onClick={onStartLesson}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Continue Learning
            </Button>
          </div>
        </Card>

        {/* Mascot Encouragement */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
            <div className="text-2xl">🦜</div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "You're doing great! Keep up the fantastic progress!" - Mano
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentSection="home" onNavigate={onNavigate || (() => {})} />
    </div>
  )
}
