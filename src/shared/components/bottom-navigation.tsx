"use client"

import { Home, BookOpen, Book, User } from "lucide-react"
import { cn } from "../../lib/utils"

interface BottomNavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

export function BottomNavigation({ currentSection, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "practice", label: "Luyện tập", icon: BookOpen },
    { id: "dictionary", label: "Từ điển", icon: Book },
    { id: "profile", label: "Hồ sơ", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300",
                  "hover:scale-105 transform-gpu relative",
                  isActive 
                    ? "text-orange-600 bg-orange-50" 
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                )}
              >
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "scale-110" : "hover:scale-110"
                  )} 
                  fill={isActive ? 'currentColor' : 'none'}
                />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
