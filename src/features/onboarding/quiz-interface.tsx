"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { Badge } from "../../shared/ui/badge"
import { ChevronRight, Check, X, ArrowLeft, RotateCcw, Trophy, Star, Clock, Camera } from "lucide-react"
import { cn } from "../../lib/utils"
import { QuizQuestion, fetchQuizQuestions } from "../../lib/quizData"

interface QuizInterfaceProps {
  onNext: () => void
  onBack?: () => void
  categoryId?: string
  questionCount?: number
  onComplete?: (score: number, totalQuestions: number) => void
}

export function QuizInterface({ onNext, onBack, categoryId, questionCount = 10, onComplete }: QuizInterfaceProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState<0.5 | 1 | 1.25>(1)
  const [showMirror, setShowMirror] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mirrorVideoRef = useRef<HTMLVideoElement | null>(null)
  const mirrorStreamRef = useRef<MediaStream | null>(null)

  const currentQuestion = questions[currentQuestionIndex]

  const getGenericPrompt = () => {
    if (!currentQuestion) return ''
    // Only adjust for single-video types; keep specialized UI for comparisons
    if (currentQuestion.type === 'video-comparison') return currentQuestion.question
    if ((currentQuestion as any).category === 'numbers') return 'Ký hiệu trên biểu thị số mấy?'
    return 'Ký hiệu trên có ý nghĩa gì?'
  }

  useEffect(() => {
    const loadQuizQuestions = async () => {
      try {
        setLoading(true)
        setError(null)
        const quizQuestions = await fetchQuizQuestions(categoryId, questionCount)
        setQuestions(quizQuestions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz questions')
      } finally {
        setLoading(false)
      }
    }
    
    loadQuizQuestions()
  }, [categoryId, questionCount])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [timeLeft, showResult])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        mirrorStreamRef.current = stream
        if (mirrorVideoRef.current) {
          mirrorVideoRef.current.srcObject = stream
          await mirrorVideoRef.current.play()
        }
      } catch {
        // ignore
      }
    }
    const stopCamera = () => {
      if (mirrorStreamRef.current) {
        mirrorStreamRef.current.getTracks().forEach((t) => t.stop())
        mirrorStreamRef.current = null
      }
    }
    if (showMirror) startCamera()
    return () => stopCamera()
  }, [showMirror])

  const handleTimeUp = () => {
    setShowResult(true)
    setIsCorrect(false)
    setStreak(0)
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return

    setSelectedAnswer(answer)
    let correct = false
    
    if (typeof currentQuestion.correctAnswer === 'boolean') {
      // For true/false questions
      correct = (answer === 'true') === currentQuestion.correctAnswer
    } else if (Array.isArray(currentQuestion.correctAnswer)) {
      // For multiple correct answers
      correct = currentQuestion.correctAnswer.includes(answer)
    } else {
      // For single correct answer
      correct = currentQuestion.correctAnswer === answer
    }
    
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(prev => prev + (currentQuestion.points || 10))
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer("")
      setShowResult(false)
      setIsCorrect(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
      onComplete?.(score, questions.length)
    }
  }

  const handleRetry = () => {
    setSelectedAnswer("")
    setShowResult(false)
    setIsCorrect(false)
    setTimeLeft(30)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "Dễ"
      case "medium": return "Trung bình"
      case "hard": return "Khó"
      default: return difficulty
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option && showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-accent">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <div className="font-semibold text-foreground">{option}</div>
                </div>
                {showResult && selectedAnswer === option && (
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    isCorrect ? "bg-green-500" : "bg-red-500",
                  )}>
                    {isCorrect ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                )}
              </button>
            ))}
          </div>
        )

      case 'true-false':
        return (
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'true', label: 'Đúng', icon: '✅' },
              { value: 'false', label: 'Sai', icon: '❌' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerSelect(option.value)}
                disabled={showResult}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex flex-col items-center justify-center text-center",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option.value && showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-semibold text-foreground">{option.label}</div>
              </button>
            ))}
          </div>
        )

      case 'sign-recognition':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-center text-center",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option && showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="text-4xl">{option}</div>
              </button>
            ))}
          </div>
        )

      case 'fill-blank':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-center text-center",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option && showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="font-semibold text-foreground">{option}</div>
              </button>
            ))}
          </div>
        )

      case 'video-comparison':
        return (
          <div className="space-y-4">
            {/* Two videos side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-center font-semibold text-sm">Video A</div>
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <video
                    className="w-full h-full object-contain"
                    src={currentQuestion.signVideo}
                    playsInline
                    autoPlay
                    loop
                    muted
                    onError={(e) => {
                      console.error('Video A load error:', currentQuestion.signVideo);
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 text-gray-500">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📹</div>
                      <div className="text-sm">Video A không thể tải</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-center font-semibold text-sm">Video B</div>
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <video
                    className="w-full h-full object-contain"
                    src={currentQuestion.signVideo2}
                    playsInline
                    autoPlay
                    loop
                    muted
                    onError={(e) => {
                      console.error('Video B load error:', currentQuestion.signVideo2);
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 text-gray-500">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📹</div>
                      <div className="text-sm">Video B không thể tải</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                    "flex items-center justify-between text-left",
                    !showResult && "hover:border-primary/50",
                    selectedAnswer === option && showResult
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : selectedAnswer === option
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background",
                    showResult && "cursor-not-allowed",
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-accent">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <div className="font-semibold text-foreground">{option}</div>
                  </div>
                  {showResult && selectedAnswer === option && (
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      isCorrect ? "bg-green-500" : "bg-red-500",
                    )}>
                      {isCorrect ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )

      case 'translation':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option && showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-accent">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <div className="font-semibold text-foreground">{option}</div>
                </div>
                {showResult && selectedAnswer === option && (
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    isCorrect ? "bg-green-500" : "bg-red-500",
                  )}>
                    {isCorrect ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                )}
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (quizCompleted) {
    const percentage = Math.round((score / (questions.length * 10)) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Hoàn thành bài quiz!</h1>
              <div className="text-4xl font-bold text-primary">{percentage}%</div>
              <p className="text-muted-foreground">Bạn đạt {score} điểm trên tổng {questions.length * 10} điểm</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-xl">
                <div className="text-2xl font-bold text-foreground">{score}</div>
                <div className="text-sm text-muted-foreground">Điểm</div>
              </div>
              <div className="p-4 bg-card rounded-xl">
                <div className="text-2xl font-bold text-foreground">{streak}</div>
                <div className="text-sm text-muted-foreground">Chuỗi tốt nhất</div>
              </div>
            </div>

            <Button
              onClick={onNext}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl"
            >
              Tiếp tục
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Đang tải bài quiz...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Lỗi tải dữ liệu</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="w-full"
              >
                Thử lại
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Không có câu hỏi</h2>
              <p className="text-muted-foreground mb-4">Không tìm thấy câu hỏi phù hợp</p>
              {onBack && (
                <Button onClick={onBack} variant="outline" className="w-full">
                  Quay lại
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const defaultSignVideo = "/resources/videos/Chào.mp4"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {onBack && (
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </div>
          )}

          {/* Progress and Stats */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Câu hỏi {currentQuestionIndex + 1}/{questions.length}
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-mono">{timeLeft}s</span>
              </div>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {getDifficultyLabel(currentQuestion.difficulty)}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>{score} điểm</span>
                </div>
              </div>
              {streak > 0 && (
                <div className="flex items-center space-x-1 text-sm text-accent">
                  <Trophy className="w-4 h-4" />
                  <span>{streak} liên tiếp</span>
                </div>
              )}
            </div>
          </div>

          {/* Title / Prompt */}
          {currentQuestion.type !== 'video-comparison' && (
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground text-balance leading-tight mb-4">
                {getGenericPrompt()}
              </h1>
            </div>
          )}

          {/* Video preview with overlay controls - only show for non-video-comparison types */}
          {currentQuestion.type !== 'video-comparison' && (
            <div className="relative rounded-2xl overflow-hidden border bg-muted/20">
              <video
                ref={videoRef}
                className="w-full aspect-video object-contain bg-black"
                src={currentQuestion.signVideo || defaultSignVideo}
                playsInline
                autoPlay
                loop
                muted
                onError={(e) => {
                  console.error('Main video load error:', currentQuestion.signVideo);
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📹</div>
                  <div className="text-sm">Video không thể tải</div>
                  <div className="text-xs mt-1">Câu hỏi: {currentQuestion.question}</div>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPlaybackRate((r) => (r === 1 ? 0.5 : r === 0.5 ? 1.25 : 1))}
                  className="bg-black/50 text-white hover:bg-black/70"
                  aria-label="Change video speed"
                >
                  <span className="text-xs font-semibold">{playbackRate}x</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMirror(true)}
                  className="bg-black/50 text-white hover:bg-black/70"
                  aria-label="Open sign mirror"
                >
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Keep question text only for non-single-video types, or as supplementary below options if needed */}
          {currentQuestion.type === 'video-comparison' && (
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground text-balance leading-tight mb-6 mt-4">
                {currentQuestion.question}
              </h1>
            </div>
          )}

          {/* Mirror modal */}
          {showMirror && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-card rounded-xl shadow-xl w-full max-w-xl border border-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="font-medium">Mirror practice</div>
                  <Button variant="ghost" size="sm" onClick={() => setShowMirror(false)}>Đóng</Button>
                </div>
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border">
                    <video ref={mirrorVideoRef} className="w-full aspect-video object-cover" muted playsInline />
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Hãy làm theo ký hiệu trong video như trước gương.</div>
                </div>
              </div>
            </div>
          )}

          {/* Answer Options */}
          {renderQuestion()}

          {/* Result Message */}
          {showResult && (
            <div className={cn(
              "text-center p-4 rounded-xl",
              isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
            )}>
              <div className="font-semibold mb-2">
                {isCorrect ? "Chính xác!" : "Chưa đúng, thử lại nhé!"}
              </div>
              {currentQuestion.explanation && (
                <p className="text-sm">{currentQuestion.explanation}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {showResult ? (
              <div className="flex space-x-3">
                {!isCorrect && (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Thử lại
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Tiếp tục" : "Hoàn tất"}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Chọn một đáp án để tiếp tục
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
