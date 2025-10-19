"use client"

import { Card } from "../../shared/ui/card"
import { Button } from "../../shared/ui/button"
import { cn } from "../../lib/utils"
import { 
  User, 
  Lock, 
  Globe, 
  CreditCard, 
  Download, 
  RotateCcw, 
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react"

interface ProfileTabProps {
  onLogout?: () => void
}

export function ProfileTab({ onLogout }: ProfileTabProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="container mx-auto px-4 py-6 max-w-md space-y-6 animate-slide-up">
        {/* User Info Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Avatar with Trophy/Streak Icons */}
          <div className="relative w-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              AN
            </div>
            
            {/* Trophy and Streak Icons - positioned at top right */}
            <div className="absolute right-0 top-0 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-md border border-blue-100">
                <span className="text-lg">🔥</span>
                <span className="font-bold text-sm text-gray-800">0</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-md border border-blue-100">
                <span className="text-lg">🏆</span>
                <span className="font-bold text-sm text-gray-800">0</span>
              </div>
            </div>
          </div>
          
          {/* Name & Email */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">an</h2>
            <p className="text-sm text-gray-600">antt.consulting@gmail.com</p>
          </div>
        </div>

        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="p-5 text-center space-y-3">
            {/* Fire Icon with streak count */}
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-2 animate-float">🔥</div>
              <div className="flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1">
                <span className="text-2xl">❄️</span>
                <span className="text-lg font-bold text-blue-600">0</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-800">Start daily streak!</h3>

            {/* Week Days */}
            <div className="flex items-center justify-center gap-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                <div key={day} className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                    index === 0 
                      ? "border-orange-400 border-dashed" 
                      : "border-gray-300"
                  )}>
                    {index === 0 && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />}
                  </div>
                  <span className={cn(
                    "text-xs mt-1",
                    index === 0 ? "text-orange-600 font-semibold" : "text-gray-600"
                  )}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upgrade Button */}
        <Button 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          Upgrade
        </Button>

        {/* Account Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Account</h3>
          
          <Card className="divide-y border border-gray-200 shadow-sm overflow-hidden">
            {/* Edit personal data */}
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Edit personal data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>

            {/* Change password */}
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Change password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>

            {/* Switch language */}
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Switch language</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>
          </Card>
        </div>

        {/* Subscription Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Subscription</h3>
          
          <Card className="border border-gray-200 shadow-sm overflow-hidden">
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Payment plans</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded">
                  UPGRADE
                </span>
                <ChevronRight className="w-5 h-5 text-orange-500" />
              </div>
            </button>
          </Card>
        </div>

        {/* Learning Progress Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Learning progress</h3>
          
          <Card className="divide-y border border-gray-200 shadow-sm overflow-hidden">
            {/* Download certificate */}
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Download certificate</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>

            {/* Reset all progress */}
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Reset all progress</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>
          </Card>
        </div>

        {/* Support Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide px-1">Support</h3>
          
          <Card className="border border-gray-200 shadow-sm overflow-hidden">
            <button className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Help</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-500" />
            </button>
          </Card>
        </div>

        {/* Log Out Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 text-base font-medium text-orange-600 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  )
}