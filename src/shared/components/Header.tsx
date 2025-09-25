import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Flame, Trophy, Heart, Settings } from "lucide-react";

interface HeaderProps {
  onGoToProfile?: () => void;
  onGoToSettings?: () => void;
  onLogout?: () => void;
}

const Header = ({ onGoToProfile, onGoToSettings, onLogout }: HeaderProps) => {
  const [streak] = useState(7);
  const [xp] = useState(1250);
  const [hearts] = useState(5);
  const [level] = useState(3);
  const xpToNextLevel = 500;
  const currentLevelXp = xp % xpToNextLevel;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-card border-b border-border px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            GoLearn
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {/* Streak */}
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-blue-500">{streak}</span>
          </div>

          {/* XP Progress */}
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-blue-600" />
            <div className="flex flex-col">
              <div className="text-sm font-medium">Cấp {level}</div>
              <Progress value={(currentLevelXp / xpToNextLevel) * 100} className="w-24 h-2" />
            </div>
            <span className="text-sm text-muted-foreground">{xp} XP</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-500 fill-current" />
            <span className="font-semibold text-blue-500">{hearts}</span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 relative">
            <Button variant="ghost" size="icon" onClick={onGoToSettings}>
              <Settings className="w-5 h-5" />
            </Button>
            <button className="rounded-full focus:outline-none" onClick={toggleMenu} aria-haspopup="menu" aria-expanded={isMenuOpen}>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-blue-600 text-white">U</AvatarFallback>
              </Avatar>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-40 rounded-md border bg-popover shadow-md" role="menu" onMouseLeave={closeMenu}>
                <button className="w-full text-left px-3 py-2 hover:bg-accent" role="menuitem" onClick={() => { closeMenu(); onGoToProfile?.(); }}>Xem profile</button>
                <button className="w-full text-left px-3 py-2 hover:bg-accent text-red-600" role="menuitem" onClick={() => { closeMenu(); onLogout?.(); }}>Đăng xuất</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
