"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Badge } from "../../shared/ui/badge"
import { Input } from "../../shared/ui/input"
import { Switch } from "../../shared/ui/switch"
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Clock, 
  Target, 
  Bell, 
  Moon, 
  Sun,
  Edit,
  Save,
  X
} from "lucide-react"

interface ProfileSystemProps {
  userPreferences: {
    firstName: string
    language: string
    goal: string
    reasons: string[]
    email: string
    password: string
  }
  progress: {
    currentLesson: number
    totalLessons: number
    completedLessons: number
    currentStreak: number
    totalXP: number
    accuracy: number
    timeSpent: number
  }
  onBack?: () => void
}

export function ProfileSystem({ userPreferences, progress, onBack }: ProfileSystemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: userPreferences.firstName,
    email: userPreferences.email,
    goal: userPreferences.goal
  })
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
    hapticFeedback: true,
    autoPlay: false
  })

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      firstName: userPreferences.firstName,
      email: userPreferences.email,
      goal: userPreferences.goal
    })
    setIsEditing(false)
  }

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const getLevel = () => {
    return Math.floor(progress.totalXP / 100) + 1
  }

  const getNextLevelXP = () => {
    return (getLevel() * 100) - progress.totalXP
  }

  const getLevelProgress = () => {
    const currentLevelXP = progress.totalXP % 100
    return (currentLevelXP / 100) * 100
  }

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
            <User className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {userPreferences.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{userPreferences.firstName}</h2>
                <p className="text-muted-foreground">{userPreferences.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Level Progress */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-foreground">Level {getLevel()}</h3>
                <p className="text-sm text-muted-foreground">Sign Language Learner</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                {progress.totalXP} XP
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {getLevel() + 1}</span>
                <span className="text-foreground">{getNextLevelXP()} XP to go</span>
              </div>
              <Progress value={getLevelProgress()} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{progress.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{progress.completedLessons}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{Math.floor(progress.timeSpent / 60)}m</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{progress.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Edit Profile</h3>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input
                    value={editData.firstName}
                    onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Daily Goal</label>
                  <Input
                    value={editData.goal}
                    onChange={(e) => setEditData(prev => ({ ...prev, goal: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Settings */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Settings</h3>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">Notifications</div>
                  <div className="text-sm text-muted-foreground">Get reminders to practice</div>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.darkMode ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium text-foreground">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-muted-foreground">🔊</div>
                <div>
                  <div className="font-medium text-foreground">Sound Effects</div>
                  <div className="text-sm text-muted-foreground">Play sounds for interactions</div>
                </div>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
              />
            </div>

            {/* Haptic Feedback */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-muted-foreground">📳</div>
                <div>
                  <div className="font-medium text-foreground">Haptic Feedback</div>
                  <div className="text-sm text-muted-foreground">Vibrate on interactions</div>
                </div>
              </div>
              <Switch
                checked={settings.hapticFeedback}
                onCheckedChange={(checked) => handleSettingChange('hapticFeedback', checked)}
              />
            </div>

            {/* Auto Play */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-muted-foreground">▶️</div>
                <div>
                  <div className="font-medium text-foreground">Auto Play</div>
                  <div className="text-sm text-muted-foreground">Automatically play sign videos</div>
                </div>
              </div>
              <Switch
                checked={settings.autoPlay}
                onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Learning Preferences */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Learning Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language:</span>
              <Badge variant="outline">{userPreferences.language.toUpperCase()}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Goal:</span>
              <Badge variant="outline">{userPreferences.goal}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Learning For:</span>
              <div className="flex flex-wrap gap-1">
                {userPreferences.reasons.map((reason, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
