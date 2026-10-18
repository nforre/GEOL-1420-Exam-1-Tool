import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shuffle, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Volume2, 
  CheckCircle, 
  HelpCircle,
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';
import { TopicId, StudyItem, MasteryLevel } from '../types';
import { TOPICS, STUDY_ITEMS } from '../data/geologyData';
import { sound } from '../utils/sound';

interface FlashcardsViewProps {
  initialTopic?: TopicId | 'all';
  cardMastery: Record<string, MasteryLevel>;
  bookmarkedCards: Record<string, boolean>;
  onUpdateMastery: (cardId: string, level: MasteryLevel) => void;
  onToggleBookmark: (cardId: string) => void;
  onLogStudyCard: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  initialTopic = 'all',
  cardMastery,
  bookmarkedCards,
  onUpdateMastery,
  onToggleBookmark,
  onLogStudyCard,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all' | 'flagged'>(initialTopic);
  const [deck, setDeck] = useState<StudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Filter deck based on topic or flagged
  const filterDeck = useCallback(() => {
    let list: StudyItem[] = [];
    if (selectedTopic === 'all') {
      list = [...STUDY_ITEMS];
    } else if (selectedTopic === 'flagged') {
      list = STUDY_ITEMS.filter((item) => bookmarkedCards[item.id] || cardMastery[item.id] === 'learning');
      if (list.length === 0) list = [...STUDY_ITEMS]; // fallback if nothing flagged
    } else {
      list = STUDY_ITEMS.filter((item) => item.topicId === selectedTopic);
    }
    setDeck(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, bookmarkedCards, cardMastery]);

  useEffect(() => {
    filterDeck();
  }, [filterDeck]);

  const currentCard = deck[currentIndex];

  const handleFlip = () => {
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  };

  const handleNext = useCallback(() => {
    if (deck.length === 0) return;
    setSlideDirection('right');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
    onLogStudyCard();
  }, [deck.length, onLogStudyCard]);

  const handlePrev = useCallback(() => {
    if (deck.length === 0) return;
    setSlideDirection('left');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const handleShuffle = () => {
    sound.playFlip();
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRate = (level: MasteryLevel) => {
    if (!currentCard) return;
    if (level === 'mastered') {
      sound.playCorrect();
    } else {
      sound.playFlip();
    }
    onUpdateMastery(currentCard.id, level);
    handleNext();
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const textToSpeak = isFlipped 
      ? `${currentCard.term}. ${currentCard.definition}` 
      : currentCard.term;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        handleRate('learning');
      } else if (e.key === '2') {
        handleRate('reviewing');
      } else if (e.key === '3') {
        handleRate('mastered');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFlipped, currentCard]);

  // Current card status
  const cardStatus = currentCard ? cardMastery[currentCard.id] || 'unseen' : 'unseen';
  const isBookmarked = currentCard ? !!bookmarkedCards[currentCard.id] : false;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Header & Topic Filter Strip */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Interactive Strata Flashcards
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Flip to reveal definitions, PDF page citations, and geological key points. Use Spacebar to flip.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Shuffle card order"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle Deck
            </button>
          </div>
        </div>

        {/* Topic Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedTopic === 'all'
                ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
            }`}
          >
            All Topics ({STUDY_ITEMS.length})
          </button>

          <button
            onClick={() => setSelectedTopic('flagged')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              selectedTopic === 'flagged'
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-amber-800 dark:text-amber-400 hover:bg-stone-200 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-3 h-3 fill-current" />
            Flagged & Learning
          </button>

          {TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const count = STUDY_ITEMS.filter((i) => i.topicId === topic.id).length;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
              >
                {topic.shortName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard Stage */}
      {deck.length > 0 && currentCard ? (
        <div className="space-y-4">
          {/* Deck Meta Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium px-1">
            <span className="font-mono">
              Card {currentIndex + 1} of {deck.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="capitalize">
                Status: <strong className="font-semibold text-stone-800 dark:text-stone-200">{cardStatus}</strong>
              </span>
              <span className="text-stone-300 dark:text-stone-600">|</span>
              <span>Review Sheet: {currentCard.pdfPage ? `Page ${currentCard.pdfPage}` : 'General'}</span>
            </div>
          </div>

          {/* 3D Animated Flip Card Container */}
          <div 
            className="w-full min-h-[340px] sm:min-h-[380px] perspective-1000 cursor-pointer select-none"
            onClick={handleFlip}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${currentCard.id}-${isFlipped ? 'back' : 'front'}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.96,
                  rotateY: isFlipped ? 90 : -90
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.96,
                  rotateY: isFlipped ? -90 : 90
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full min-h-[340px] sm:min-h-[380px] p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 transition-shadow shadow-md flex flex-col justify-between relative overflow-hidden ${
                  isFlipped 
                    ? 'border-amber-400 dark:border-amber-500/80 shadow-amber-500/5' 
                    : 'border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Stratigraphic accent bar on card edge */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    backgroundColor: TOPICS.find((t) => t.id === currentCard.topicId)?.accentHex || '#c9a46a'
                  }}
                />

                {/* Card Top: Topic Tag & Quick Actions */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-slate-600">
                      {currentCard.topicName}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      PDF p.{currentCard.pdfPage}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Speak Button */}
                    <button
                      onClick={handleSpeak}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
                      title="Listen to pronunciation / text"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playFlip();
                        onToggleBookmark(currentCard.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-700'
                      }`}
                      title={isBookmarked ? 'Remove from review list' : 'Bookmark for priority review'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Center: Term or Answer */}
                <div className="my-auto py-6 text-center">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                        Exam Concept / Question
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white max-w-2xl mx-auto leading-snug">
                        {currentCard.term}
                      </h2>
                      <p className="text-xs text-stone-400 font-medium">
                        Click card or press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 font-mono text-[10px]">Space</kbd> to reveal definition
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left max-w-2xl mx-auto">
                      <div>
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                          Definition & Geological Context
                        </span>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                          {currentCard.term}
                        </h3>
                      </div>

                      <p className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                        {currentCard.definition}
                      </p>

                      {currentCard.highlight && (
                        <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
                          <strong className="font-semibold block mb-0.5">Exam Core Takeaway:</strong>
                          {currentCard.highlight}
                        </div>
                      )}

                      {currentCard.exampleOrNote && (
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          <strong className="font-semibold text-stone-700 dark:text-stone-300">Exam Examples: </strong>
                          {currentCard.exampleOrNote}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Bottom Hint / Status */}
                <div className="pt-2 border-t border-stone-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    Tap to flip
                  </span>
                  <span className="hidden sm:inline">
                    Shortcuts: 1 Again · 2 Review · 3 Mastered · ← / → Navigate
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Prev / Next & Spaced Repetition Buttons */}
          <div className="space-y-3 pt-2">
            {/* Rating Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleRate('learning')}
                className="py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/80 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-red-700 dark:text-red-300 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="Mark for frequent review (Press 1)"
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Review Again <span className="opacity-60 text-xs hidden sm:inline">(1)</span></span>
              </button>

              <button
                onClick={() => handleRate('reviewing')}
                className="py-3 px-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/80 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="Familiar but need brush-up (Press 2)"
              >
                <RotateCw className="w-4 h-4 shrink-0" />
                <span>Moderate <span className="opacity-60 text-xs hidden sm:inline">(2)</span></span>
              </button>

              <button
                onClick={() => handleRate('mastered')}
                className="py-3 px-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="Got it down completely (Press 3)"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Mastered <span className="opacity-60 text-xs hidden sm:inline">(3)</span></span>
              </button>
            </div>

            {/* Navigation Strip */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Card
              </button>

              {/* Progress dots indicator */}
              <div className="text-xs text-stone-400 font-mono">
                {currentIndex + 1} / {deck.length}
              </div>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-500 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Next Card
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800">
          <Layers className="w-10 h-10 mx-auto text-stone-400 mb-2" />
          <h3 className="text-base font-bold text-stone-800 dark:text-white">No cards in this filter</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1 mb-4">
            Try switching back to "All Topics" or flag cards to build a custom review queue.
          </p>
          <button
            onClick={() => setSelectedTopic('all')}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs cursor-pointer"
          >
            Show All Flashcards
          </button>
        </div>
      )}
    </div>
  );
};
