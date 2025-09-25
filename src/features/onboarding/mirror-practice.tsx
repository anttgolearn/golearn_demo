"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Progress } from "../../shared/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Camera, CheckCircle } from "lucide-react"

interface MirrorPracticeProps {
  onNext: () => void
  onBack?: () => void
}

export function MirrorPractice({ onNext, onBack }: MirrorPracticeProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [practiceStep, setPracticeStep] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const practiceSigns = [
    { word: "HELLO", emoji: "👋", description: "Wave your hand" },
    { word: "THANK YOU", emoji: "🙏", description: "Prayer hands gesture" },
    { word: "PLEASE", emoji: "🤲", description: "Open palms together" },
    { word: "YES", emoji: "👍", description: "Thumbs up" },
    { word: "NO", emoji: "👎", description: "Thumbs down" }
  ]

  const currentSign = practiceSigns[practiceStep]

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    startCamera()
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    stopCamera()
    setShowFeedback(true)
    // Simulate feedback after a delay
    setTimeout(() => {
      setIsCorrect(Math.random() > 0.3) // 70% chance of being correct
    }, 1000)
  }

  const handleNextSign = () => {
    if (practiceStep < practiceSigns.length - 1) {
      setPracticeStep(prev => prev + 1)
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      onNext()
    }
  }

  const handleRetry = () => {
    setShowFeedback(false)
    setIsCorrect(false)
  }

  const handlePlaySign = () => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
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

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Practice {practiceStep + 1} of {practiceSigns.length}</span>
              <span className="text-foreground">{Math.round(((practiceStep + 1) / practiceSigns.length) * 100)}%</span>
            </div>
            <Progress value={((practiceStep + 1) / practiceSigns.length) * 100} className="h-2" />
          </div>

          {/* Current Sign */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Practice: {currentSign.word}</h1>
            
            {/* Sign Demonstration */}
            <div className="relative">
              <div className="w-full h-48 bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                {isPlaying ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                      <div className="text-2xl text-primary-foreground">{currentSign.emoji}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Playing sign for "{currentSign.word}"</p>
                  </div>
                ) : (
                  <button
                    onClick={handlePlaySign}
                    className="flex flex-col items-center space-y-4 hover:scale-105 transition-transform"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Tap to see the sign</p>
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{currentSign.description}</p>
          </div>

          {/* Camera Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Your Turn!</h2>
            
            {!isRecording ? (
              <div className="w-full h-48 bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Ready to practice?</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-black rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Recording Controls */}
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button
                  onClick={handleStartRecording}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={handleStopRecording}
                  variant="destructive"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`text-center p-4 rounded-xl ${
              isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <RotateCcw className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {isCorrect ? "Great job!" : "Try again!"}
                </span>
              </div>
              <p className="text-sm">
                {isCorrect 
                  ? "Your sign looks perfect! Keep it up!" 
                  : "Don't worry, practice makes perfect. Try again!"
                }
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {showFeedback ? (
              <div className="flex space-x-3">
                {!isCorrect && (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
                <Button
                  onClick={handleNextSign}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {practiceStep < practiceSigns.length - 1 ? "Next Sign" : "Finish"}
                </Button>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Record yourself signing to get feedback
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">Tips for Success:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Make sure your hands are clearly visible</li>
              <li>• Sign slowly and clearly</li>
              <li>• Keep your face in the frame</li>
              <li>• Practice the sign a few times before recording</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
