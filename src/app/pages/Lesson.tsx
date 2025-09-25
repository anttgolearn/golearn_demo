"use client"

import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent } from "../../shared/ui/card";
import { Progress } from "../../shared/ui/progress";
import { Badge } from "../../shared/ui/badge";
import { ArrowLeft, Play, RotateCcw, Check, X, Heart } from "lucide-react";

interface LessonQuestion {
  id: string;
  type: "video-watch" | "multiple-choice" | "practice";
  question: string;
  videoUrl?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

const Lesson = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions: LessonQuestion[] = [
        {
          id: "1",
      type: "video-watch",
      question: "Xem video và học cách chào hỏi cơ bản",
      videoUrl: "https://example.com/greeting-video.mp4",
      explanation: "Đây là cách chào hỏi cơ bản trong ngôn ngữ ký hiệu"
        },
        {
          id: "2", 
      type: "multiple-choice",
      question: "Cách chào 'Xin chào' trong ngôn ngữ ký hiệu là gì?",
      options: ["Vẫy tay", "Gật đầu", "Nhảy", "Hát"],
      correctAnswer: "Vẫy tay",
      explanation: "Chào 'Xin chào' được thực hiện bằng cách vẫy tay nhẹ nhàng"
        },
        {
          id: "3",
      type: "practice",
      question: "Thực hành chào hỏi",
      explanation: "Hãy thực hành động tác chào hỏi mà bạn đã học"
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
      const correct = answer === currentQ.correctAnswer;
      setIsCorrect(correct);
      setShowResult(true);
      
      if (correct) {
        setXp(prev => prev + 10);
      } else {
      setHearts(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const renderQuestion = () => {
    switch (currentQ.type) {
      case "video-watch":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Video sẽ được hiển thị ở đây</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {currentQ.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    selectedAnswer === option
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && selectedAnswer === option && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}>
                        {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`p-4 rounded-lg ${
                isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}>
                <p className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Chính xác!" : "Sai rồi!"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        );

      case "practice":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Thực hành động tác</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Bài học: Chào hỏi cơ bản</h1>
                <p className="text-sm text-muted-foreground">
                  Câu hỏi {currentQuestion + 1} / {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium">{hearts}</span>
              </div>
              <Badge variant="secondary">
                {xp} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tiến độ bài học</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
                  </div>
                  
        {/* Question Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>
            {renderQuestion()}
            </CardContent>
          </Card>

          {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Làm lại
            </Button>
            
            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!showResult && currentQ.type === "multiple-choice"}>
                Tiếp theo
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Hoàn thành
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;