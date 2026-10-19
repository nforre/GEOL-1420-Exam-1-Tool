import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Bookmark, 
  Volume2, 
  ArrowRight,
  BookOpen,
  Filter,
  Layers,
  HelpCircle
} from 'lucide-react';
import { TopicId, StudyItem, MasteryLevel } from '../types';
import { TOPICS, STUDY_ITEMS } from '../data/geologyData';
import { sound } from '../utils/sound';

interface LearnViewProps {
  initialTopic?: TopicId | 'all' | 'needs_review';
  cardMastery: Record<string, MasteryLevel>;
  termCorrectStreaks: Record<string, number>;
  bookmarkedCards: Record<string, boolean>;
  onAnswerTerm: (termId: string, isCorrect: boolean) => void;
  onToggleBookmark: (termId: string) => void;
  onNavigateToTab: (tab: 'dashboard' | 'quiz' | 'cards' | 'speed' | 'strata' | 'guide') => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  initialTopic = 'all',
  cardMastery,
  termCorrectStreaks,
  bookmarkedCards,
  onAnswerTerm,
  onToggleBookmark,
  onNavigateToTab,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all' | 'needs_review'>(initialTopic);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<StudyItem[]>([]);
  const [roundCompleted, setRoundCompleted] = useState(false);

  // Filter study items based on selected category
  const activePool = useMemo(() => {
    if (selectedTopic === 'all') {
      return [...STUDY_ITEMS];
    } else if (selectedTopic === 'needs_review') {
      const items = STUDY_ITEMS.filter(
        (i) => cardMastery[i.id] === 'learning' || cardMastery[i.id] === 'reviewing' || bookmarkedCards[i.id]
      );
      return items.length > 0 ? items : [...STUDY_ITEMS];
    } else {
      return STUDY_ITEMS.filter((i) => i.topicId === selectedTopic);
    }
  }, [selectedTopic, cardMastery, bookmarkedCards]);

  // Reset and shuffle deck
  const startLearningRound = useCallback(() => {
    sound.playFlip();
    const unmastered = activePool.filter((i) => cardMastery[i.id] !== 'mastered');
    const toStudy = unmastered.length > 0 ? unmastered : activePool;
    const shuffled = [...toStudy].sort(() => 0.5 - Math.random());
    setShuffledDeck(shuffled);
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
    setRoundCompleted(false);
  }, [activePool, cardMastery]);

  useEffect(() => {
    startLearningRound();
  }, [selectedTopic]);

  const currentItem = shuffledDeck[currentIdx];

  // Distractors generator for 4 multiple choice options
  const currentOptions = useMemo(() => {
    if (!currentItem) return [];
    const others = STUDY_ITEMS.filter((i) => i.id !== currentItem.id);
    const sameTopic = others.filter((i) => i.topicId === currentItem.topicId);
    const candidatePool = sameTopic.length >= 3 ? sameTopic : others;
    const distractors = [...candidatePool].sort(() => 0.5 - Math.random()).slice(0, 3);

    const allOpts = [currentItem.definition, ...distractors.map((d) => d.definition)];
    return allOpts.sort(() => 0.5 - Math.random());
  }, [currentItem]);

  const correctOptionIdx = currentItem ? currentOptions.indexOf(currentItem.definition) : -1;

  // Current item mastery status
  const currentStreak = currentItem ? (termCorrectStreaks[currentItem.id] || 0) : 0;
  const currentMastery = currentItem ? (cardMastery[currentItem.id] || 'unseen') : 'unseen';

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentItem) return;
    setSelectedOptIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === correctOptionIdx;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    // Call state update
    onAnswerTerm(currentItem.id, isCorrect);
  };

  const handleNext = () => {
    sound.playFlip();
    if (currentIdx + 1 < shuffledDeck.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
    } else {
      // Completed round
      setRoundCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Tally counts across current pool
  const poolMastered = activePool.filter((i) => cardMastery[i.id] === 'mastered').length;
  const poolReviewing = activePool.filter((i) => cardMastery[i.id] === 'reviewing').length;
  const poolLearning = activePool.filter((i) => cardMastery[i.id] === 'learning').length;
  const poolUnseen = activePool.filter((i) => cardMastery[i.id] === 'unseen').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header & Topic Filter */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf1e6] dark:bg-emerald-950/40 text-[#44543d] dark:text-emerald-300 text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quizlet-Style Active Recall
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-vintage font-bold tracking-tight text-stone-900 dark:text-white">
              Learn Mode
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Answer correctly <strong>twice</strong> to master each term. Errors are automatically flagged for review.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={startLearningRound}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Round
            </button>
          </div>
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedTopic === 'all'
                ? 'bg-[#5c7054] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            All Terms ({STUDY_ITEMS.length})
          </button>

          <button
            onClick={() => setSelectedTopic('needs_review')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              selectedTopic === 'needs_review'
                ? 'bg-[#c35d45] text-white shadow-xs'
                : 'bg-[#fbf3e8] dark:bg-amber-950/40 text-[#b04832] dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            <Bookmark className="w-3 h-3 fill-current" />
            Needs Review ({poolLearning + poolReviewing})
          </button>

          {TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const count = STUDY_ITEMS.filter((i) => i.topicId === topic.id).length;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#5c7054] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {topic.shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Progress Tracker Strip */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Mastered: {poolMastered}
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
              <RotateCcw className="w-3.5 h-3.5" />
              Reviewing: {poolReviewing}
            </span>
            <span className="flex items-center gap-1.5 text-[#c35d45] dark:text-red-400 font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              Learning: {poolLearning}
            </span>
          </div>

          <div className="text-stone-400 font-mono text-[11px]">
            {activePool.length > 0 ? Math.round((poolMastered / activePool.length) * 100) : 0}% Mastered in Set
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {roundCompleted ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-800 border-2 border-[#708865]/40 dark:border-slate-700 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#eaf1e6] dark:bg-emerald-950/40 text-[#44543d] dark:text-emerald-400 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Round Complete!
            </span>
            <h2 className="text-3xl font-bold font-serif-vintage tracking-tight text-stone-900 dark:text-white mt-1">
              You Finished This Practice Deck!
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mt-2">
              Keep answering until all terms reach <strong>Mastered (2 correct in a row)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startLearningRound}
              className="px-6 py-3 rounded-2xl bg-[#5c7054] hover:bg-[#4d6046] text-white font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Continue Next Round
            </button>
            <button
              onClick={() => onNavigateToTab('quiz')}
              className="px-6 py-3 rounded-2xl bg-[#c35d45] hover:bg-[#ab4e38] text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              Take Practice Exam
            </button>
            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-600 text-stone-700 dark:text-stone-300 font-medium text-sm hover:bg-stone-50 transition-all cursor-pointer"
            >
              View Dashboard
            </button>
          </div>
        </div>
      ) : currentItem ? (
        <div className="space-y-4">
          {/* Card Frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 shadow-md space-y-6"
            >
              {/* Question Top Bar */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#eaf1e6] dark:bg-slate-700 text-[#44543d] dark:text-emerald-300">
                    {currentItem.topicName}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    PDF Page {currentItem.pdfPage}
                  </span>
                </div>

                {/* Term Mastery Status Badge */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(`${currentItem.term}. ${currentItem.definition}`)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 transition-colors"
                    title="Read term aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onToggleBookmark(currentItem.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      bookmarkedCards[currentItem.id]
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                    }`}
                    title="Bookmark term"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedCards[currentItem.id] ? 'fill-current' : ''}`} />
                  </button>

                  {/* 2x Mastery Streak Pill */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    currentMastery === 'mastered'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : currentStreak === 1
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}>
                    {currentMastery === 'mastered' ? '★ Mastered' : currentStreak === 1 ? '1/2 Correct' : '0/2 Mastered'}
                  </span>
                </div>
              </div>

              {/* Term Prompt */}
              <div className="space-y-1.5 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Select matching definition:
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold tracking-tight text-stone-900 dark:text-white leading-snug">
                  {currentItem.term}
                </h2>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentOptions.map((opt, idx) => {
                  const isSelected = selectedOptIdx === idx;
                  let optStyle = 'border-stone-200 dark:border-slate-700 hover:border-[#5c7054] bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200';
                  let icon = null;

                  if (isAnswered) {
                    if (idx === correctOptionIdx) {
                      optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 font-semibold';
                      icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
                    } else {
                      optStyle = 'opacity-40 border-stone-200 dark:border-slate-700 text-stone-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer text-xs sm:text-sm leading-relaxed ${optStyle}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Mastery Status Change Box */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                    selectedOptIdx === correctOptionIdx
                      ? 'bg-[#f2f7ef] dark:bg-emerald-950/40 border-[#708865]/40 text-[#2f3d2a] dark:text-emerald-200'
                      : 'bg-red-50/80 dark:bg-red-950/40 border-red-200 text-red-950 dark:text-red-200'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {selectedOptIdx === correctOptionIdx ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Correct! {currentStreak + 1 >= 2 ? '★ Mastered! (Answered right twice)' : '1 of 2 correct answers needed to master'}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          {currentStreak > 0 ? 'Slipped up! Downgraded to Reviewing' : 'Incorrect — Flagged as Learning'}
                        </>
                      )}
                    </span>
                  </div>

                  {currentItem.highlight && (
                    <p className="text-[11px] opacity-90">
                      <strong>Exam Key Fact:</strong> {currentItem.highlight}
                    </p>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-xl bg-[#5c7054] hover:bg-[#4d6046] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{currentIdx + 1 === shuffledDeck.length ? 'Finish Round' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Card Index */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono px-2">
            <span>Card {currentIdx + 1} of {shuffledDeck.length}</span>
            <span>Needs 2 correct answers to reach Mastered</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
