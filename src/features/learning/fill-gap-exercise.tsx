"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface FillGapExerciseProps {
  onNext: () => void
  onBack?: () => void
}

export function FillGapExercise({ onNext, onBack }: FillGapExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const question = {
    sentence: ["XIN CHÀO", "_____"],
    options: ["BẠN", "CHÀO MỪNG", "KHỎE"],
    correctAnswer: "BẠN",
    translation: "Xin chào bạn!",
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleCheck = () => {
    if (!selectedAnswer) return
    const correct = selectedAnswer === question.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleNext = () => {
    if (showResult) {
      onNext()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <Progress value={75} className="h-2" />
        </div>

        <Card className="p-8 text-center space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Điền từ còn thiếu!</h2>

            {/* Sentence with gap */}
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <span className="text-foreground">{question.sentence[0]}</span>
              <div className="min-w-[100px] h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted">
                {selectedAnswer && (
                  <span
                    className={`font-bold ${showResult ? (isCorrect ? "text-green-600" : "text-red-600") : "text-foreground"}`}
                  >
                    {selectedAnswer}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Answer Options */}
          {!showResult && (
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={option}
                  variant="outline"
                  size="lg"
                  className="h-12 text-lg font-semibold bg-transparent"
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span className="mr-2 text-muted-foreground">{index + 1}</span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div
                className={`flex items-center justify-center gap-2 text-lg font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Chính xác!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    Chưa đúng!
                  </>
                )}
              </div>

              {isCorrect && <p className="text-muted-foreground">Dịch: "{question.translation}"</p>}

              <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleNext}>
                Tiếp tục
              </Button>
            </div>
          )}

          {!showResult && (
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={!selectedAnswer} onClick={handleCheck}>
              Kiểm tra
            </Button>
          )}
        </Card>
      </div>
    </div>
  )
}
