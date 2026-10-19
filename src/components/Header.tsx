import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Flame, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Heart,
  Palette
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  activeTab: 'dashboard' | 'learn' | 'quiz' | 'cards' | 'speed' | 'strata' | 'guide';
  onSelectTab: (tab: 'dashboard' | 'learn' | 'quiz' | 'cards' | 'speed' | 'strata' | 'guide') => void;
  streakDays: number;
  readinessScore: number;
  isDark: boolean;
  onToggleDark: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isGingham: boolean;
  onToggleGingham: () => void;
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
  isGingham,
  onToggleGingham,
}) => {
  const navTabs: { 
    id: 'dashboard' | 'learn' | 'quiz' | 'cards' | 'speed' | 'strata' | 'guide'; 
    label: string;
    tag: string;
    colorHex: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', tag: 'Overview', colorHex: '#5c7054' },
    { id: 'learn', label: 'Learn', tag: 'Active Recall', colorHex: '#3d7a5a' },
    { id: 'quiz', label: 'Practice Exam', tag: 'Custom Exam', colorHex: '#df9f3b' },
    { id: 'cards', label: 'Flashcards', tag: 'Cards', colorHex: '#c35d45' },
    { id: 'speed', label: 'Speed Match', tag: 'Game', colorHex: '#d87355' },
    { id: 'strata', label: 'Strata Explorer', tag: 'Visualizer', colorHex: '#5b727a' },
    { id: 'guide', label: 'Study Guide', tag: 'All Terms', colorHex: '#485844' },
  ];

  return (
    <header className="w-full">
      {/* Retro Browser Window Header (Inspired by Ref 1 & 4) */}
      <div className="bg-[#e2edd9] dark:bg-[#1f2821] border-b-2 border-[#5c7054]/40 dark:border-emerald-950 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Retro browser window controls & navigation buttons */}
        <div className="flex items-center gap-2">
          {/* Window dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#e57373] border border-[#c62828]/30 inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#ffb74d] border border-[#ef6c00]/30 inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#81c784] border border-[#2e7d32]/30 inline-block shadow-2xs" />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[#44543d] dark:text-emerald-300">
            <button 
              onClick={() => onSelectTab('dashboard')} 
              className="p-1 rounded hover:bg-[#5c7054]/10 transition-colors"
              title="Home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => onSelectTab('cards')} 
              className="p-1 rounded hover:bg-[#5c7054]/10 transition-colors"
              title="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="p-1 rounded hover:bg-[#5c7054]/10 transition-colors"
              title="Reload study app"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Retro URL Bar (Ref 1 Carrd style) */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-[#5c7054]/30 dark:border-slate-700 shadow-2xs text-[#44543d] dark:text-emerald-200 font-mono text-[11px]">
            <Heart className="w-3 h-3 text-[#c35d45] fill-current" />
            <span className="font-semibold">geol1420.study/exam-2</span>
            <span className="text-[#a4b69d] dark:text-stone-500">★</span>
          </div>
        </div>

        {/* Right: Quick Settings & Indicators */}
        <div className="flex items-center gap-2.5">
          {/* Streak pill */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-bold text-[11px] border border-amber-300/60"
            title="Active daily study streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{streakDays}d Streak</span>
          </div>

          {/* Readiness gauge */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-[#5c7054]/30 dark:border-slate-700 text-[11px] font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-50 cursor-pointer shadow-2xs"
            title="Readiness score"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#df9f3b]" />
            <span>{readinessScore}%</span>
          </button>

          {/* Pattern background toggle */}
          <button
            onClick={onToggleGingham}
            className="p-1.5 rounded-lg text-[#5c7054] dark:text-emerald-400 hover:bg-[#5c7054]/15 transition-colors cursor-pointer"
            title={isGingham ? 'Switch to solid background' : 'Enable retro gingham wallpaper'}
            aria-label="Toggle wallpaper pattern"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg text-[#5c7054] dark:text-emerald-400 hover:bg-[#5c7054]/15 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Dark toggle */}
          <button
            onClick={onToggleDark}
            className="p-1.5 rounded-lg text-[#5c7054] dark:text-emerald-400 hover:bg-[#5c7054]/15 transition-colors cursor-pointer"
            title={isDark ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Retro Color-Blocked Folder Tabs Strip (Ref 4 & Ref 1) */}
      <nav className="bg-[#d5e4cc] dark:bg-[#18201a] px-3 pt-2 border-b-2 border-[#5c7054]/40 dark:border-slate-800 flex items-end gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playFlip();
                onSelectTab(tab.id);
              }}
              style={{
                borderTopColor: isActive ? tab.colorHex : 'transparent',
              }}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all border-t-4 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs border-x border-[#5c7054]/30 dark:border-slate-700'
                  : 'bg-[#c3d9b8]/60 dark:bg-slate-850 text-[#3d4f36] dark:text-stone-300 hover:bg-[#c3d9b8] dark:hover:bg-slate-800'
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: tab.colorHex }}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
