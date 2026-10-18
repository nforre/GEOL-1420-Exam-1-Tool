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
        action: 'Quiz Finished',
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
        detail: `Achieved ${score} pts in term-definition matching`,
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
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 text-stone-900 dark:text-stone-100 font-sans transition-colors flex flex-col selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      {/* Navigation Header */}
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs py-6 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200">GEOL 1420 Exam 2 Master</span>
            <span>·</span>
            <span>Integrated with Course Review PDF (Pages 1–7)</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Historical Geology & Stratigraphy</span>
            <span>·</span>
            <button
              onClick={() => handleNavigateToTab('guide')}
              className="hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
            >
              Glossary Index
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
