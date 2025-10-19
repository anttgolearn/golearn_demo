"use client"

import { useState, useMemo } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Input } from "../../shared/ui/input"
import { Play, X, Search } from "lucide-react"
import { cn } from "../../lib/utils"
import { 
  dictionaryCategories, 
  dictionaryWords, 
  getFrequentWords, 
  type DictionaryWord 
} from "../../lib/dictionary-data"

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string>("All")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [selectedWord, setSelectedWord] = useState<DictionaryWord | null>(null)

  const frequentWords = getFrequentWords()

  // Filter words based on search, letter, and category
  const filteredWords = useMemo(() => {
    let words = dictionaryWords

    // Filter by category
    if (selectedCategory !== 'all') {
      words = words.filter(w => w.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      words = words.filter(w => 
        w.word.toLowerCase().includes(term) || 
        w.vietnamese.toLowerCase().includes(term)
      )
    }

    // Filter by letter
    if (selectedLetter !== 'All') {
      if (selectedLetter === 'Numbers') {
        words = words.filter(w => w.category === 'numbers')
      } else {
        words = words.filter(w => w.word.charAt(0).toUpperCase() === selectedLetter)
      }
    }

    return words
  }, [searchTerm, selectedLetter, selectedCategory])

  const playVideo = (word: DictionaryWord) => {
    setSelectedWord(word)
    setVideoPreview(word.videoUrl)
  }

  const closeVideo = () => {
    setVideoPreview(null)
    setSelectedWord(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="container mx-auto px-4 py-6 max-w-md space-y-6 animate-slide-up">
        {/* Trophy and Streak Icons */}
        <div className="flex items-center justify-end gap-3 animate-fade-in">
          <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-md border border-blue-100">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-sm text-gray-800">0</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-md border border-blue-100">
            <span className="text-lg">🏆</span>
            <span className="font-bold text-sm text-gray-800">0</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Search Dictionary</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Type a word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-4 text-base bg-white border border-gray-200 shadow-sm hover:shadow-md focus:shadow-lg focus:border-blue-400 transition-all duration-300 rounded-xl placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dictionaryCategories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "h-9 px-3 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap flex-shrink-0",
                  "hover:scale-105 active:scale-95",
                  selectedCategory === category.id 
                    ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" 
                    : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200"
                )}
              >
                <span className="mr-1.5">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Filter by Letter</h3>
          <div className="grid grid-cols-7 gap-2">
            <Button
              variant="ghost"
              onClick={() => setSelectedLetter("All")}
              className={cn(
                "h-9 text-xs font-medium transition-all duration-300 rounded-lg",
                "hover:scale-105 active:scale-95",
                selectedLetter === "All" 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200"
              )}
            >
              All
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedLetter("Numbers")}
              className={cn(
                "h-9 text-xs font-medium transition-all duration-300 rounded-lg col-span-2",
                "hover:scale-105 active:scale-95",
                selectedLetter === "Numbers" 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200"
              )}
            >
              123
            </Button>
            {alphabet.map((letter, index) => (
              <Button
                key={letter}
                variant="ghost"
                onClick={() => setSelectedLetter(letter)}
                className={cn(
                  "h-9 text-sm font-medium transition-all duration-300 rounded-lg",
                  "hover:scale-105 active:scale-95",
                  selectedLetter === letter 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200"
                )}
                style={{ animationDelay: `${index * 10}ms` }}
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* Most Frequently Searched Words */}
        {!searchTerm && selectedLetter === "All" && selectedCategory === "all" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Frequently Searched</h2>
            <Card className="divide-y border border-gray-200 shadow-sm overflow-hidden">
              {frequentWords.map((word, index) => (
                <button
                  key={word.id}
                  onClick={() => playVideo(word)}
                  className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                      {word.emoji}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800">{word.word}</span>
                      <span className="text-xs text-gray-500">{word.vietnamese}</span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation()
                      playVideo(word)
                    }}
                  >
                    <Play className="w-4 h-4" fill="currentColor" />
                  </Button>
                </button>
              ))}
            </Card>
          </div>
        )}

        {/* Filtered Results */}
        {(searchTerm || selectedLetter !== "All" || selectedCategory !== "all") && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">
              Results ({filteredWords.length})
            </h2>
            {filteredWords.length === 0 ? (
              <Card className="p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-gray-600 font-medium">No words found</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
              </Card>
            ) : (
              <Card className="divide-y border border-gray-200 shadow-sm overflow-hidden">
                {filteredWords.map((word, index) => (
                  <button
                    key={word.id}
                    onClick={() => playVideo(word)}
                    className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {word.emoji}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-800">{word.word}</span>
                        <span className="text-xs text-gray-500">{word.vietnamese}</span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                      onClick={(e) => {
                        e.stopPropagation()
                        playVideo(word)
                      }}
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                    </Button>
                  </button>
                ))}
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {videoPreview && selectedWord && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={closeVideo}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{selectedWord.word}</h3>
                <p className="text-sm text-gray-600">{selectedWord.vietnamese}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={closeVideo}
                className="h-9 w-9 p-0 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            </div>

            {/* Video Content */}
            <div className="p-6 bg-gray-50">
              <div className="rounded-xl overflow-hidden border-2 border-gray-200 bg-black shadow-lg">
                <video 
                  key={videoPreview}
                  className="w-full aspect-video object-contain" 
                  src={videoPreview} 
                  playsInline 
                  autoPlay 
                  loop 
                  controls
                >
                  <source src={videoPreview} type="video/mp4" />
                  Video không khả dụng
                </video>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <Button 
                onClick={closeVideo}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}