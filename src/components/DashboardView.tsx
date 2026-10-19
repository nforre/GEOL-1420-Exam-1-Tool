import React from 'react';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  BrainCircuit, 
  Trophy, 
  TrendingUp, 
  RotateCcw, 
  ArrowRight, 
  Bookmark,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserEngagementState, TopicId } from '../types';
import { TOPICS, STUDY_ITEMS } from '../data/geologyData';
import { getTopicMasteryBreakdown, calculateReadinessScore } from '../utils/storage';

interface DashboardViewProps {
  engagement: UserEngagementState;
  onNavigateToTab: (tab: 'dashboard' | 'learn' | 'cards' | 'quiz' | 'speed' | 'strata' | 'guide', filterTopic?: TopicId | 'needs_review') => void;
  onResetProgress: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  engagement,
  onNavigateToTab,
  onResetProgress,
}) => {
  const readiness = calculateReadinessScore(engagement);

  // Calculate overall counts
  const totalCards = STUDY_ITEMS.length;
  let masteredCount = 0;
  let reviewingCount = 0;
  let learningCount = 0;
  let unseenCount = 0;

  STUDY_ITEMS.forEach((item) => {
    const status = engagement.cardMastery[item.id] || 'unseen';
    if (status === 'mastered') masteredCount++;
    else if (status === 'reviewing') reviewingCount++;
    else if (status === 'learning') learningCount++;
    else unseenCount++;
  });

  const bookmarkedCount = Object.values(engagement.bookmarkedCards).filter(Boolean).length;

  // Average quiz score
  const avgQuiz = engagement.quizHistory.length > 0
    ? Math.round(engagement.quizHistory.reduce((acc, q) => acc + q.percentage, 0) / engagement.quizHistory.length)
    : 0;

  // Grade indicator
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { letter: 'A', text: 'Exam Ready', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' };
    if (score >= 80) return { letter: 'B', text: 'Solid Progress', color: 'text-teal-700 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800' };
    if (score >= 70) return { letter: 'C', text: 'Review Recommended', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' };
    return { letter: 'Need Prep', text: 'Start with Learn Mode', color: 'text-stone-700 dark:text-stone-300', bg: 'bg-stone-100 dark:bg-slate-800 border-stone-200 dark:border-slate-700' };
  };

  const grade = getGradeInfo(readiness);

  // Identify weak cards (learning or bookmarked or reviewing)
  const weakCards = STUDY_ITEMS.filter(
    (item) => engagement.cardMastery[item.id] === 'learning' || engagement.cardMastery[item.id] === 'reviewing' || engagement.bookmarkedCards[item.id]
  ).slice(0, 4);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Top Hero: Exam Readiness & Engagement Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Readiness Overview Banner (Ref 4 & 5 Warm Earthy Aesthetic) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#566d50] dark:bg-[#233122] text-[#fbf8ee] shadow-md relative overflow-hidden border-2 border-[#41553c] dark:border-emerald-950">
          {/* Subtle background strata texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3d4f38]/60 border border-[#78966f]/40 text-[#fbf8ee] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#f2b74f]" />
                GEOL 1420 Exam 2 Readiness & Recall
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-vintage font-bold tracking-tight text-[#fbf8ee]">
                Historical Geology & Stratigraphy
              </h1>
              <p className="text-xs sm:text-sm text-[#e0eadb] max-w-xl leading-relaxed">
                Answer questions correctly <strong>twice</strong> in Learn Mode or Practice Exams to reach Mastered. Errors automatically mark terms for review.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateToTab('learn')}
                  className="px-4 py-2.5 rounded-xl bg-[#df9f3b] hover:bg-[#c98e32] text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Learn Mode (2x)
                </button>
                <button
                  onClick={() => onNavigateToTab('quiz')}
                  className="px-4 py-2.5 rounded-xl bg-[#c35d45] hover:bg-[#ab4e38] text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4" />
                  Practice Exam
                </button>
                <button
                  onClick={() => onNavigateToTab('cards')}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-[#fbf8ee] font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  Flashcards
                </button>
              </div>
            </div>

            {/* Circular Readiness Gauge */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#3d4f38]/70 border border-[#78966f]/30 backdrop-blur-xs min-w-[160px] self-center shadow-inner">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#2e3b2a]"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * readiness) / 100}
                    strokeLinecap="round"
                    className="text-[#f2b74f] transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold font-mono tracking-tight text-[#fbf8ee]">{readiness}%</span>
                  <span className="text-[10px] text-[#c9dbc3] uppercase tracking-wider font-bold">Readiness</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-bold text-[#f2b74f]">{grade.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Engagement Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {/* Streak Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#5c7054]/30 dark:border-slate-700 flex items-center gap-3.5 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#fbf3e8] dark:bg-amber-950/50 text-[#c35d45]">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Daily Streak</div>
              <div className="text-xl font-bold font-serif-vintage text-stone-900 dark:text-white">
                {engagement.streakDays} {engagement.streakDays === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>

          {/* Time Spent */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Study Time Logged</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white font-mono">
                {engagement.studyMinutes} min
              </div>
            </div>
          </div>

          {/* Quiz Accuracy */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Avg Quiz Accuracy</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white font-mono">
                {avgQuiz > 0 ? `${avgQuiz}%` : 'No quizes yet'}
              </div>
            </div>
          </div>

          {/* Speed Match */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Speed Match Best</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white font-mono">
                {engagement.speedMatchBestScore > 0 ? `${engagement.speedMatchBestScore} pts` : 'Play mode'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Distribution Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-white">Fossil & Stratigraphy Card Mastery</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {totalCards} total concepts cataloged from the 7-page GEOL 1420 exam review sheet.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Mastered: {masteredCount}
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Reviewing: {reviewingCount}
            </span>
            <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
              Learning: {learningCount}
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600 inline-block" />
              Unseen: {unseenCount}
            </span>
          </div>
        </div>

        {/* Stacked Bar */}
        <div className="w-full h-3.5 bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
          <div 
            style={{ width: `${(masteredCount / totalCards) * 100}%` }} 
            className="bg-emerald-500 transition-all duration-500" 
            title={`Mastered: ${masteredCount}`}
          />
          <div 
            style={{ width: `${(reviewingCount / totalCards) * 100}%` }} 
            className="bg-amber-500 transition-all duration-500" 
            title={`Reviewing: ${reviewingCount}`}
          />
          <div 
            style={{ width: `${(learningCount / totalCards) * 100}%` }} 
            className="bg-orange-400 transition-all duration-500" 
            title={`Learning: ${learningCount}`}
          />
          <div 
            style={{ width: `${(unseenCount / totalCards) * 100}%` }} 
            className="bg-stone-300 dark:bg-stone-600 transition-all duration-500" 
            title={`Unseen: ${unseenCount}`}
          />
        </div>
      </div>

      {/* Chapter Breakdown Matrix (7 Core Topics from PDF) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Exam Syllabus Breakdown</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Comprehension tracking across each module from the official exam review sheet.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('guide')}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Full Study Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((topic) => {
            const stats = getTopicMasteryBreakdown(engagement, topic.id);
            return (
              <div
                key={topic.id}
                className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                      {topic.pdfPages}
                    </span>
                    <span className="text-xs font-bold font-mono text-stone-900 dark:text-white">
                      {stats.percent}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-3">
                    {topic.description}
                  </p>

                  {/* Progress Line */}
                  <div className="w-full h-2 bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-500"
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">
                    {stats.mastered} of {stats.total} mastered
                  </span>
                  <button
                    onClick={() => onNavigateToTab('cards', topic.id)}
                    className="font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    Drill Topic
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Needs Review & Recent Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Review / Bookmarked Cards */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">Terms Marked for Review</h3>
            </div>
            <span className="text-xs text-stone-500">
              {bookmarkedCount + learningCount} items flagged
            </span>
          </div>

          {weakCards.length > 0 ? (
            <div className="space-y-3">
              {weakCards.map((card) => (
                <div 
                  key={card.id} 
                  className="p-3 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 truncate">
                      {card.term}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                      {card.definition}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('learn', card.topicId)}
                    className="shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#5c7054] text-white hover:bg-[#4d6046] transition-colors cursor-pointer shadow-2xs"
                  >
                    Learn
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-500 dark:text-stone-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
              No flagged terms right now. Great job keeping your deck mastered!
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-700/60 flex items-center justify-between">
            <button
              onClick={() => onNavigateToTab('cards')}
              className="text-xs font-semibold text-stone-500 hover:underline cursor-pointer"
            >
              Browse Flashcards
            </button>
            <button
              onClick={() => onNavigateToTab('learn', 'needs_review')}
              className="text-xs font-bold text-[#c35d45] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Practice in Learn Mode
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Engagement & Quiz Activity Log */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">Recent Study Activity</h3>
            </div>
            <span className="text-xs text-stone-500">
              {engagement.quizHistory.length} quizzes recorded
            </span>
          </div>

          <div className="space-y-3">
            {engagement.recentActivity.slice(0, 4).map((act) => (
              <div 
                key={act.id} 
                className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80"
              >
                <div className="p-1.5 rounded-md bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-stone-300 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-900 dark:text-white truncate">
                      {act.action}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {act.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-700/60 flex items-center justify-between">
            <button
              onClick={onResetProgress}
              className="text-xs text-stone-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset engagement stats back to initial state"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Study Stats
            </button>
            <button
              onClick={() => onNavigateToTab('quiz')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Start new quiz
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
