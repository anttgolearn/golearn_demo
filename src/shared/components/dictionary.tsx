"use client"

import { useState } from "react"
import React from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Input } from "../../shared/ui/input"
import { Badge } from "../../shared/ui/badge"
import { ArrowLeft, Search, Play, Volume2, Star, Filter } from "lucide-react"
import { cn } from "../../lib/utils"

interface DictionaryEntry {
  word: string
  emoji: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  isFavorite: boolean
  videoUrl?: string
}

// Demo dictionary entries and categories (no API)
const categories = [
  { id: "all", name: "Tất cả", count: 0 },
  { id: "greetings", name: "Chào hỏi", count: 0 },
  { id: "courtesy", name: "Lịch sự", count: 0 },
  { id: "weather", name: "Thời tiết", count: 0 },
  { id: "family", name: "Gia đình", count: 0 },
  { id: "numbers", name: "Số đếm", count: 0 },
  { id: "colors", name: "Màu sắc", count: 0 },
  { id: "food", name: "Đồ ăn", count: 0 },
  { id: "emotions", name: "Cảm xúc", count: 0 },
]

interface DictionaryProps {
  onBack?: () => void
}

export function Dictionary({ onBack }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [entries, setEntries] = useState<DictionaryEntry[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize local demo data
  React.useEffect(() => {
    setLoading(true)
    setError(null)
    const demoEntries: DictionaryEntry[] = [
      { word: 'Xin chào', emoji: '👋', description: 'Lời chào cơ bản', category: 'greetings', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/Chào.mp4' },
      { word: 'Xin lỗi', emoji: '🙏', description: 'Thể hiện sự xin lỗi', category: 'courtesy', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/xin lỗi.mp4' },
      { word: 'Mưa', emoji: '🌧️', description: 'Thời tiết: mưa', category: 'weather', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/mưa phùn.mp4' },
      { word: 'Mẹ', emoji: '👩', description: 'Thành viên gia đình', category: 'family', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/mẹ.mp4' },
      { word: 'Số 1', emoji: '1️⃣', description: 'Số đếm cơ bản', category: 'numbers', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/1.mp4' },
      { word: 'Màu đỏ', emoji: '🟥', description: 'Tên màu', category: 'colors', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/màu đỏ.mp4' },
      { word: 'Cơm', emoji: '🍚', description: 'Món ăn', category: 'food', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/cơm.mp4' },
      // Cảm xúc (20 từ) - Đã cập nhật ánh xạ video chính xác
      { word: 'Vui mừng', emoji: '😊', description: 'Cảm xúc tích cực, hạnh phúc', category: 'emotions', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/vui mừng - nam.mp4' },
      { word: 'Buồn thảm', emoji: '😢', description: 'Cảm xúc tiêu cực, thất vọng', category: 'emotions', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/buồn thảm.mp4' },
      { word: 'Giận dữ', emoji: '😠', description: 'Cảm xúc tức giận, bực bội', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/giận_dữ.mp4' },
      { word: 'Hoảng sợ', emoji: '😨', description: 'Cảm xúc lo sợ, hoảng hốt', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/hoảng_sợ.mp4' },
      { word: 'Lo sợ', emoji: '😰', description: 'Cảm xúc bồn chồn, không yên', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/lo_sợ.mp4' },
      { word: 'Tuyệt vọng', emoji: '😞', description: 'Cảm xúc không đạt được mong muốn', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/tuyệt_vọng.mp4' },
      { word: 'Ngạc nhiên', emoji: '😲', description: 'Cảm xúc bất ngờ, kinh ngạc', category: 'emotions', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/Ngạc_nhiên.mp4' },
      { word: 'Cô đơn', emoji: '😌', description: 'Cảm xúc thoải mái, không căng thẳng', category: 'emotions', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/cô_đơn.mp4' },
      { word: 'Hồi hộp', emoji: '😓', description: 'Cảm xúc áp lực, không thoải mái', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/hồi_hộp.mp4' },
      { word: 'Tự tin', emoji: '😎', description: 'Cảm xúc tin tưởng vào bản thân', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/tự_tin.mp4' },
      { word: 'Buồn thảm', emoji: '😳', description: 'Cảm xúc ngượng ngùng, e thẹn', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/buồn thảm.mp4' },
      { word: 'Thích thú', emoji: '🤩', description: 'Cảm xúc hứng thú, yêu thích', category: 'emotions', difficulty: 'easy', isFavorite: false, videoUrl: '/resources/videos/thích_thú.mp4' },
      { word: 'Nhẹn ngào', emoji: '😑', description: 'Cảm xúc không hứng thú, mệt mỏi', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/nguyện_ngào.mp4' },
      { word: 'Ghen tị', emoji: '😒', description: 'Cảm xúc không vui vì người khác có gì đó', category: 'emotions', difficulty: 'hard', isFavorite: false, videoUrl: '/resources/videos/ghen_tị.mp4' },
      { word: 'Xin lỗi', emoji: '🙏', description: 'Cảm xúc cảm kích, trân trọng', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/xin lỗi.mp4' },
      { word: 'Hồi hộp', emoji: '🥺', description: 'Cảm xúc bồn chồn, lo lắng', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/hồi_hộp.mp4' },
      { word: 'Bối rối', emoji: '😕', description: 'Cảm xúc không hiểu rõ, lúng túng', category: 'emotions', difficulty: 'medium', isFavorite: false, videoUrl: '/resources/videos/bối_rối.mp4' },
    ]
    setEntries(demoEntries)
    categories.forEach(category => {
      if (category.id === 'all') {
        category.count = demoEntries.length
      } else {
        category.count = demoEntries.filter(e => e.category === category.id).length
      }
    })
    setLoading(false)
  }, [])

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (word: string) => {
    setFavorites(prev => 
      prev.includes(word) 
        ? prev.filter(f => f !== word)
        : [...prev, word]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
        <div className="bg-card border-b p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Từ điển ký hiệu</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Đang tải từ điển...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
        <div className="bg-card border-b p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Từ điển ký hiệu</h1>
            </div>
          </div>
        </div>
        <div className="text-center py-20">
          <div className="text-red-500 mb-4">Lỗi tải dữ liệu: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Từ điển ký hiệu</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm ký hiệu..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Chủ đề</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Dictionary Entries */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">
              {filteredEntries.length} kết quả
            </h2>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
              >
                Xóa tìm kiếm
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map((entry, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Entry Header */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{entry.emoji}</div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(entry.difficulty)}>
                        {entry.difficulty}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(entry.word)}
                        className="p-1 h-auto"
                      >
                        <Star 
                          className={cn(
                            "w-4 h-4",
                            favorites.includes(entry.word) 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-muted-foreground"
                          )} 
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">{entry.word}</h3>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary"
                      onClick={() => setVideoPreview(entry.videoUrl || null)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Xem
                    </Button>
                    
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Không tìm thấy ký hiệu</h3>
              <p className="text-muted-foreground">
                Thử thay đổi từ khóa hoặc bộ lọc chủ đề
              </p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Yêu thích ({favorites.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((word) => {
                const entry = entries.find(e => e.word === word)
                if (!entry) return null
                return (
                  <Badge
                    key={word}
                    variant="outline"
                    className="text-sm cursor-pointer hover:bg-primary/10"
                    onClick={() => toggleFavorite(word)}
                  >
                    {entry.emoji} {entry.word}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {videoPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] border border-border overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
              <div className="font-medium">Xem ký hiệu</div>
              <Button variant="ghost" size="sm" onClick={() => setVideoPreview(null)}>Đóng</Button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="rounded-lg overflow-hidden border">
                <video className="w-full aspect-video object-contain bg-black" src={videoPreview} playsInline autoPlay loop muted />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
