"use client"

import { Button } from "../../shared/ui/button"
import { Home, BookOpen, Book, User } from "lucide-react"

interface BottomNavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

export function BottomNavigation({ currentSection, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "practice", label: "Practice", icon: BookOpen },
    { id: "dictionary", label: "Dictionary", icon: Book },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
      <div className="flex justify-around py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentSection === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : ""}`}>{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
