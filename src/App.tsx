import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopicId, MasteryLevel, UserEngagementState } from './types';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { SpeedMatchView } from './components/SpeedMatchView';
import { StrataExplorerView } from './components/StrataExplorerView';
import { StudyGuideView } from './components/StudyGuideView';
import { 
  loadEngagementState, 
  saveEngagementState, 
  calculateReadinessScore, 
  getDefaultEngagementState 
} from './utils/storage';
import { sound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide'>('dashboard');
  const [activeTopicFilter, setActiveTopicFilter] = useState<TopicId | 'all'>('all');
  const [engagement, setEngagement] = useState<UserEngagementState>(() => loadEngagementState());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGingham, setIsGingham] = useState(true);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('geol_dark_theme') === 'true' || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('geol_dark_theme', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('geol_dark_theme', 'false');
    }
  }, [isDark]);

  // Keep sound helper in sync
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Study timer (increments active study minutes every 60 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setEngagement((prev) => {
        const next = {
          ...prev,
          studyMinutes: prev.studyMinutes + 1,
        };
        saveEngagementState(next);
        return next;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Update card mastery
  const handleUpdateMastery = useCallback((cardId: string, level: MasteryLevel) => {
    setEngagement((prev) => {
      const next: UserEngagementState = {
        ...prev,
        cardMastery: {
          ...prev.cardMastery,
          [cardId]: level,
        },
        cardsStudiedCount: prev.cardsStudiedCount + 1,
      };
      saveEngagementState(next);
      return next;
    });
  }, []);

  // Toggle card bookmark
  const handleToggleBookmark = useCallback((cardId: string) => {
    setEngagement((prev) => {
      const isBookmarked = !!prev.bookmarkedCards[cardId];
      const next: UserEngagementState = {
        ...prev,
        bookmarkedCards: {
          ...prev.bookmarkedCards,
          [cardId]: !isBookmarked,
        },
      };
      saveEngagementState(next);
      return next;
    });
  }, []);

  // Log single card studied
  const handleLogStudyCard = useCallback(() => {
    setEngagement((prev) => {
      const next: UserEngagementState = {
        ...prev,
        cardsStudiedCount: prev.cardsStudiedCount + 1,
      };
      saveEngagementState(next);
      return next;
    });
  }, []);

  // Record quiz completion
  const handleRecordQuizResult = useCallback((
    title: string, 
    score: number, 
    total: number, 
    topicId: TopicId | 'all'
  ) => {
    const percentage = Math.round((score / total) * 100);
    setEngagement((prev) => {
      const newHistoryItem = {
        id: `quiz-${Date.now()}`,
        timestamp: Date.now(),
        title,
        score,
        total,
        percentage,
        topicId,
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        timestamp: Date.now(),
        action: 'Exam Simulation Finished',
        detail: `Scored ${score}/${total} (${percentage}%) on ${title}`,
      };

      const next: UserEngagementState = {
        ...prev,
        quizzesTaken: prev.quizzesTaken + 1,
        quizHistory: [newHistoryItem, ...prev.quizHistory.slice(0, 19)],
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 14)],
      };
      saveEngagementState(next);
      return next;
    });
  }, []);

  // Record speed match score
  const handleRecordSpeedMatchScore = useCallback((score: number) => {
    setEngagement((prev) => {
      const newActivity = {
        id: `act-${Date.now()}`,
        timestamp: Date.now(),
        action: 'Speed Match Completed',
        detail: `Achieved ${score} pts in term matching`,
      };

      const next: UserEngagementState = {
        ...prev,
        speedMatchPlays: prev.speedMatchPlays + 1,
        speedMatchBestScore: Math.max(prev.speedMatchBestScore, score),
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 14)],
      };
      saveEngagementState(next);
      return next;
    });
  }, []);

  // Reset engagement stats
  const handleResetProgress = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset all your study progress and test records back to fresh state?')) {
      const fresh = getDefaultEngagementState();
      setEngagement(fresh);
      saveEngagementState(fresh);
    }
  };

  // Switch tabs with optional topic pre-selection
  const handleNavigateToTab = (
    tab: 'dashboard' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide', 
    filterTopic?: TopicId
  ) => {
    if (filterTopic) {
      setActiveTopicFilter(filterTopic);
    } else {
      setActiveTopicFilter('all');
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const readinessScore = calculateReadinessScore(engagement);

  return (
    <div className={`min-h-screen py-4 sm:py-8 px-2 sm:px-4 md:px-6 transition-colors ${
      isGingham ? 'bg-pattern-gingham' : 'bg-[#f4efe6] dark:bg-slate-950'
    }`}>
      {/* Retro Carrd Desktop Window Shell (Ref 1 & 4) */}
      <div className="max-w-6xl mx-auto rounded-3xl sm:rounded-[32px] border-4 border-[#5c7054] dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col">
        {/* Retro Header with window chrome and folder tabs */}
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTopicFilter('all');
            setActiveTab(tab);
          }}
          streakDays={engagement.streakDays}
          readinessScore={readinessScore}
          isDark={isDark}
          onToggleDark={() => setIsDark((prev) => !prev)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          isGingham={isGingham}
          onToggleGingham={() => setIsGingham((prev) => !prev)}
        />

        {/* Content Zone */}
        <main className="flex-1 w-full p-4 sm:p-6 md:p-8 bg-[#faf7f0] dark:bg-slate-900/90 text-stone-900 dark:text-stone-100 font-sans transition-colors">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'dashboard' && (
                <DashboardView
                  engagement={engagement}
                  onNavigateToTab={handleNavigateToTab}
                  onResetProgress={handleResetProgress}
                />
              )}

              {activeTab === 'cards' && (
                <FlashcardsView
                  initialTopic={activeTopicFilter}
                  cardMastery={engagement.cardMastery}
                  bookmarkedCards={engagement.bookmarkedCards}
                  onUpdateMastery={handleUpdateMastery}
                  onToggleBookmark={handleToggleBookmark}
                  onLogStudyCard={handleLogStudyCard}
                />
              )}

              {activeTab === 'quiz' && (
                <QuizView
                  initialTopic={activeTopicFilter}
                  onRecordQuizResult={handleRecordQuizResult}
                  onNavigateToTab={(tab) => handleNavigateToTab(tab)}
                />
              )}

              {activeTab === 'speed' && (
                <SpeedMatchView
                  bestScore={engagement.speedMatchBestScore}
                  onRecordScore={handleRecordSpeedMatchScore}
                />
              )}

              {activeTab === 'strata' && (
                <StrataExplorerView />
              )}

              {activeTab === 'guide' && (
                <StudyGuideView
                  initialTopic={activeTopicFilter}
                  cardMastery={engagement.cardMastery}
                  bookmarkedCards={engagement.bookmarkedCards}
                  onToggleBookmark={handleToggleBookmark}
                  onUpdateMastery={handleUpdateMastery}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Retro Window Bottom Bar */}
        <footer className="border-t-2 border-[#5c7054]/30 dark:border-slate-800 bg-[#eef5ea] dark:bg-[#18201a] px-4 sm:px-6 py-3 text-xs text-[#44543d] dark:text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">GEOL 1420 Exam 2 Master</span>
            <span>·</span>
            <span className="text-[11px] opacity-80">Historical Geology Review (Pages 1–7)</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>(Made for Texas State GEOL 1420)</span>
            <span>·</span>
            <button
              onClick={() => handleNavigateToTab('guide')}
              className="hover:underline font-semibold cursor-pointer"
            >
              Glossary Index
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
