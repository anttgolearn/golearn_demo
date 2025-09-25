"use client"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Play, Trophy, Medal } from "lucide-react"
import { BottomNavigation } from "./bottom-navigation"

interface CourseOverviewProps {
  onStartChapter: (chapterId: string) => void
  onNavigate: (section: string) => void
}

export function CourseOverview({ onStartChapter, onNavigate }: CourseOverviewProps) {
  const chapters = [
    {
      id: "chapter-1",
      title: "Hello and welcome",
      completed: 0,
      total: 6,
      description: "Learn basic greetings in sign language",
    },
    {
      id: "chapter-2",
      title: "Start a conversation",
      completed: 0,
      total: 6,
      description: "Essential conversation starters",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Introduction</h1>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <Medal className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Skip to navigation
          </Button>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">UNIT 1</h2>
          <p className="text-muted-foreground">12 chapters</p>
        </div>

        <div className="space-y-4 mb-8">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      size="sm"
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                      onClick={() => onStartChapter(chapter.id)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <div>
                      <h3 className="font-semibold text-foreground">{chapter.title}</h3>
                      <p className="text-sm text-muted-foreground">{chapter.description}</p>
                    </div>
                  </div>
                  <div className="ml-13">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>
                        {chapter.completed} of {chapter.total} lessons completed
                      </span>
                    </div>
                    <Progress value={(chapter.completed / chapter.total) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4"
          onClick={() => onStartChapter("chapter-1")}
        >
          CONTINUE
        </Button>
      </div>

      <BottomNavigation currentSection="course" onNavigate={onNavigate} />
    </div>
  )
}
