"use client"

import { useState } from "react"
import React from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Badge } from "../../shared/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/select"
import { Switch } from "../../shared/ui/switch"
import { ChevronRight, Play, Volume2, Carrot as Mirror, ArrowLeft } from "lucide-react"

interface LessonInterfaceProps {
  onNext: () => void
  onMirrorPractice?: () => void
  onBack?: () => void
}

export function LessonInterface({ onNext, onMirrorPractice, onBack }: LessonInterfaceProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<"slow" | "medium" | "normal">("normal")
  const [showTranscript, setShowTranscript] = useState(true)
  const [showViSubtitle, setShowViSubtitle] = useState(true)
  const [showSignSubtitle, setShowSignSubtitle] = useState(true)
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)

  const handlePlaySign = () => {
    setIsPlaying(true)
    // Simulate video playback
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  const [vocabulary, setVocabulary] = useState<any[]>([])
  const [topicsCovered, setTopicsCovered] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load lesson data from local demo content
  React.useEffect(() => {
    setLoading(true)
    setError(null)
    // Minimal demo vocabulary and topics
    const demoVocabulary = [
      {
        id: 'hello',
        term: 'Xin chào',
        translations: { vi: 'Xin chào' },
        variants: [
          { id: 'v1', label: 'Chuẩn' },
          { id: 'v2', label: 'Biến thể' },
        ],
      },
      {
        id: 'thankyou',
        term: 'Cảm ơn',
        translations: { vi: 'Cảm ơn' },
        variants: [
          { id: 'v1', label: 'Chuẩn' },
        ],
      },
    ]
    const demoTopics = ['Chào hỏi', 'Lịch sự', 'Từ cơ bản']
    setVocabulary(demoVocabulary)
    setTopicsCovered(demoTopics)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Đang tải bài học...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 text-center space-y-8">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <div className="text-2xl">❌</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-6 md:p-8 space-y-6 md:space-y-8">
          {onBack && (
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Lesson 1</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Lesson Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight mb-2">Học ký hiệu mới!</h1>
            <div className="text-4xl font-bold text-primary">XIN CHÀO</div>
          </div>

          {/* Video/Animation Area */}
          <div className="relative">
            <div className="w-full h-64 md:h-80 bg-muted/30 rounded-2xl border border-border flex items-center justify-center">
              {isPlaying ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <div className="text-2xl text-primary-foreground">👋</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Đang phát ký hiệu "Xin chào"</p>
                </div>
              ) : (
                <button
                  onClick={handlePlaySign}
                  className="flex flex-col items-center space-y-4 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">Chạm để xem ký hiệu</p>
                </button>
              )}
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-background/80 rounded-full px-3 py-1 shadow-md">
                <span className="text-xs text-muted-foreground">VI</span>
                <Switch checked={showViSubtitle} onCheckedChange={setShowViSubtitle} />
                <span className="text-xs text-muted-foreground">NNKH</span>
                <Switch checked={showSignSubtitle} onCheckedChange={setShowSignSubtitle} />
              </div>
              <button className="w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                <Volume2 className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {onMirrorPractice && (
              <button
                onClick={onMirrorPractice}
                className="absolute top-4 left-4 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title="Practice with camera"
              >
                <Mirror className="w-5 h-5 text-foreground" />
              </button>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Tốc độ</span>
              <Select value={speed} onValueChange={(v: "slow" | "medium" | "normal") => setSpeed(v)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tốc độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Chậm</SelectItem>
                  <SelectItem value="medium">Vừa</SelectItem>
                  <SelectItem value="normal">Bình thường</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Phụ đề</span>
              <Switch checked={showTranscript} onCheckedChange={setShowTranscript} />
            </div>
          </div>

          {showTranscript && (
            <div className="bg-muted/30 rounded-xl p-4 border border-border text-sm leading-6">
              <p className="text-muted-foreground">[VI] Xin chào! Hôm nay chúng ta sẽ học cách chào hỏi và hỏi thăm sức khỏe.</p>
              <p className="text-muted-foreground">[KÝ HIỆU] XIN CHÀO — vẫy tay, BẠN ỔN CHỨ?</p>
            </div>
          )}

          {/* Learning Tip */}
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Mẹo:</strong> Quan sát bàn tay chuyển từ nắm nhẹ sang mở khi vẫy. Đây là cử chỉ chào hỏi phổ biến.
            </p>
          </div>

          {/* Vocabulary With Variants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Từ vựng trong video</h2>
              <span className="text-xs text-muted-foreground">Chạm để xem NNKH</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {vocabulary.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setSelectedWordId(w.id)
                    setSelectedVariantId(w.variants[0]?.id ?? null)
                  }}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    selectedWordId === w.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
                  }`}
                >
                  <div className="font-medium text-sm">{w.term}</div>
                  <div className="text-xs text-muted-foreground">{w.translations.vi}</div>
                </button>
              ))}
            </div>

            {selectedWordId && (
              <div className="rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Phiên bản</div>
                  <div className="flex flex-wrap gap-2">
                    {vocabulary
                      .find((w) => w.id === selectedWordId)?.variants.map((v: { id: string; label: string }) => (
                        <Button
                          key={v.id}
                          variant={selectedVariantId === v.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariantId(v.id)}
                        >
                          {v.label}
                        </Button>
                      ))}
                  </div>
                </div>
                <div className="aspect-video bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center">
                  {isPlaying ? (
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                        <div className="text-xl text-primary-foreground">✋</div>
                      </div>
                      <p className="text-xs text-muted-foreground">Đang phát NNKH của từ</p>
                    </div>
                  ) : (
                    <button
                      onClick={handlePlaySign}
                      className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                    >
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Phát phiên bản đã chọn</p>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Tốc độ</span>
                  <Select value={speed} onValueChange={(v: "slow" | "medium" | "normal") => setSpeed(v)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Tốc độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Chậm</SelectItem>
                      <SelectItem value="medium">Vừa</SelectItem>
                      <SelectItem value="normal">Bình thường</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Topics Covered */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Chủ đề trong video</h3>
            <div className="flex flex-wrap gap-2">
              {topicsCovered.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            size="lg"
          >
            Tiếp tục
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Related Lessons */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Bài học liên quan</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Related lessons will be loaded from API */}
              {vocabulary.length === 0 && (
                <div className="col-span-2 text-center py-4 text-muted-foreground">
                  Không có bài học liên quan
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
