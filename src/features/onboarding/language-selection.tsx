"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { ChevronRight, Check, ChevronLeft } from "lucide-react"
import { cn } from "../../lib/utils"

interface LanguageOption {
  id: string
  name: string
  fullName: string
  flag: string
}

const languages: LanguageOption[] = [
  {
    id: "vsl",
    name: "VSL",
    fullName: "Ngôn ngữ Ký hiệu Việt Nam",
    flag: "🇻🇳",
  },
  {
    id: "asl",
    name: "ASL",
    fullName: "Ngôn ngữ Ký hiệu Mỹ",
    flag: "🇺🇸",
  },
  {
    id: "bsl",
    name: "BSL",
    fullName: "Ngôn ngữ Ký hiệu Anh",
    flag: "🇬🇧",
  },
]

interface LanguageSelectionProps {
  onNext: (selectedLanguage: string) => void
  onBack?: () => void
}

export function LanguageSelection({ onNext, onBack }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")

  const handleNext = () => {
    if (selectedLanguage) {
      onNext(selectedLanguage)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-6 pb-24 space-y-6">
          {/* App Header */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">SL</div>
              <span className="font-semibold">SignLearn</span>
            </div>
            {onBack && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Quay lại
              </Button>
            )}
          </div>
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">1/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
              Bạn muốn học ngôn ngữ ký hiệu nào?
            </h1>
          </div>

          {/* Language Options */}
          <div className="space-y-3">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  selectedLanguage === language.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{language.flag}</div>
                  <div>
                    <div className="font-semibold text-foreground">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.fullName}</div>
                  </div>
                </div>
                {selectedLanguage === language.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

        </div>
        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-1/3"
              disabled={!onBack}
            >
              Quay lại
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedLanguage}
              className="flex-1"
            >
              Tiếp tục
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
