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
            <p className="text-muted-foreground">Đang tải kết quả...</p>
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
    if (isExcellent) return "Xuất sắc! Bạn đang thành thạo ngôn ngữ ký hiệu!"
    if (isGood) return "Tuyệt vời! Bạn đang tiến bộ rất tốt!"
    if (isPassing) return "Tốt lắm! Hãy tiếp tục luyện tập để cải thiện!"
    return "Đừng bỏ cuộc! Luyện tập sẽ làm nên hoàn hảo!"
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
      <Card className="w-full max-w-lg mx-auto bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
        <div className="p-6 space-y-6">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          )}

          {/* Results Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
              <div className="text-5xl">{getPerformanceIcon()}</div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Hoàn thành bài học!</h1>
              <div className={`text-5xl font-bold ${getPerformanceColor()}`}>{percentage}%</div>
              <p className="text-muted-foreground text-lg">{getPerformanceMessage()}</p>
            </div>
          </div>

          {/* Score Stats - Simplified */}
          <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Điểm</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{results.score}</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Câu hỏi</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{results.totalQuestions}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Độ chính xác</span>
                <span className="text-sm font-bold text-foreground">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>

            {/* Performance Badge */}
            <div className="flex justify-center">
              <Badge 
                className={`px-6 py-2 text-base font-medium ${
                  isExcellent ? "bg-green-100 text-green-800 border-green-200" :
                  isGood ? "bg-blue-100 text-blue-800 border-blue-200" :
                  isPassing ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                  "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {isExcellent ? "🏆 Xuất sắc" : isGood ? "⭐ Tốt" : isPassing ? "👍 Đạt" : "💪 Tiếp tục cố gắng"}
              </Badge>
            </div>
          </div>

          {/* Category Info - Simplified */}
          {results.category && (
            <div className="text-center">
              <Badge variant="outline" className="text-sm px-4 py-2">
                📚 {results.category.charAt(0).toUpperCase() + results.category.slice(1)}
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onNext}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-lg"
              size="lg"
            >
              Tiếp tục học
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            {!isExcellent && (
              <Button
                onClick={onNext}
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/5 py-3"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Luyện tập thêm
              </Button>
            )}
          </div>

          {/* Encouragement Message - Simplified */}
          <div className="text-center space-y-3 pt-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-md">
              <div className="text-2xl">🦜</div>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "Mỗi ký hiệu bạn học sẽ đưa bạn đến gần hơn với sự thành thạo!"<br />
              <span className="text-xs">- Mano</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
