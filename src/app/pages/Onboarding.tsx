"use client"

import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../../shared/ui/card";
import { Badge } from "../../shared/ui/badge";
import { Progress } from "../../shared/ui/progress";
import { ChevronRight, Check, Globe, Target, Users, BookOpen } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const languages = [
    {
      id: "vsl",
      name: "Ngôn ngữ ký hiệu Việt Nam",
      description: "Ngôn ngữ ký hiệu chính thức tại Việt Nam",
      flag: "🇻🇳"
    },
    {
      id: "asl",
      name: "American Sign Language",
      description: "Ngôn ngữ ký hiệu Mỹ",
      flag: "🇺🇸"
    }
  ];

  const levels = [
    { id: "beginner", name: "Mới bắt đầu", description: "Chưa biết gì về ngôn ngữ ký hiệu" },
    { id: "intermediate", name: "Trung bình", description: "Biết một số từ cơ bản" },
    { id: "advanced", name: "Nâng cao", description: "Có thể giao tiếp cơ bản" }
  ];

  const goals = [
    { id: "communication", name: "Giao tiếp", description: "Để giao tiếp với người khiếm thính" },
    { id: "career", name: "Nghề nghiệp", description: "Để phát triển sự nghiệp" },
    { id: "family", name: "Gia đình", description: "Để giao tiếp với thành viên gia đình" },
    { id: "interest", name: "Sở thích", description: "Học vì yêu thích" }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Chọn ngôn ngữ ký hiệu</h2>
              <p className="text-muted-foreground">Bạn muốn học ngôn ngữ ký hiệu nào?</p>
            </div>
            <div className="grid gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedLanguage === lang.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <h3 className="font-semibold">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground">{lang.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Trình độ hiện tại</h2>
              <p className="text-muted-foreground">Bạn đã biết gì về ngôn ngữ ký hiệu?</p>
            </div>
            <div className="grid gap-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedLevel === level.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">{level.name}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Mục tiêu học tập</h2>
              <p className="text-muted-foreground">Tại sao bạn muốn học ngôn ngữ ký hiệu?</p>
            </div>
            <div className="grid gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedGoal === goal.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">{goal.name}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sẵn sàng bắt đầu!</h2>
              <p className="text-muted-foreground">Chúng tôi đã chuẩn bị một lộ trình học tập phù hợp với bạn</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">{selectedLanguage === "vsl" ? "🇻🇳 VSL" : "🇺🇸 ASL"}</Badge>
                <span className="text-sm">Ngôn ngữ đã chọn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">{selectedLevel}</Badge>
                <span className="text-sm">Trình độ hiện tại</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">{selectedGoal}</Badge>
                <span className="text-sm">Mục tiêu học tập</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return selectedLanguage !== "";
      case 2:
        return selectedLevel !== "";
      case 3:
        return selectedGoal !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">GoLearn</h1>
          </div>
                <CardDescription>
            Bước {step} / 4
                </CardDescription>
          <Progress value={(step / 4) * 100} className="h-2" />
              </CardHeader>
        
        <CardContent className="p-8">
          {renderStep()}
          
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Quay lại
            </Button>
            
            {step < 4 ? (
            <Button
              onClick={handleNext}
                disabled={!isStepComplete()}
              >
                Tiếp theo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Bắt đầu học
            </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;