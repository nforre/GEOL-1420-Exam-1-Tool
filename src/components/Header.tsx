import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Flame, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  activeTab: 'dashboard' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide';
  onSelectTab: (tab: 'dashboard' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide') => void;
  streakDays: number;
  readinessScore: number;
  isDark: boolean;
  onToggleDark: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  streakDays,
  readinessScore,
  isDark,
  onToggleDark,
  soundEnabled,
  onToggleSound,
}) => {
  const navItems: { id: 'dashboard' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide'; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cards', label: 'Flashcards' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'speed', label: 'Speed Match' },
    { id: 'strata', label: 'Strata Explorer' },
    { id: 'guide', label: 'Study Guide' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-colors">
      {/* Stratigraphic ribbon at top */}
      <div 
        className="h-1.5 w-full bg-gradient-to-r from-[#c9a46a] via-[#a8633f] via-[#6e7f86] via-[#8e9a63] to-[#3b4a54]"
        title="Geological Strata Ribbon"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('dashboard')} 
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-800 text-stone-100 dark:bg-amber-500/20 dark:text-amber-300 flex items-center justify-center font-bold text-sm tracking-tighter border border-stone-700/50 shadow-xs">
                G2
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
                  GEOL 1420
                </span>
                <span className="hidden sm:inline text-xs text-stone-500 dark:text-stone-400 ml-1.5 font-normal">
                  Exam 2 Review
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playFlip();
                    onSelectTab(item.id);
                  }}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-amber-600 dark:text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Engagement status & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Streak indicator */}
            <div 
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold"
              title="Consecutive daily study streak"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Readiness score meter */}
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200 dark:border-slate-700 transition-colors"
              title="Click to view engagement dashboard"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-stone-900 dark:text-white">{readinessScore}%</span>
              <span className="hidden lg:inline text-stone-500 dark:text-stone-400">Ready</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-md hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>

            {/* Dark mode Toggle */}
            <button
              onClick={onToggleDark}
              className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-md hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
