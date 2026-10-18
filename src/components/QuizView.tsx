import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  BrainCircuit, 
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { TopicId, QuizQuestion } from '../types';
import { TOPICS, QUIZ_QUESTIONS, STUDY_ITEMS } from '../data/geologyData';
import { sound } from '../utils/sound';

interface QuizViewProps {
  initialTopic?: TopicId | 'all';
  onRecordQuizResult: (title: string, score: number, total: number, topicId: TopicId | 'all') => void;
  onNavigateToTab: (tab: 'dashboard' | 'cards' | 'speed' | 'strata' | 'guide') => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialTopic = 'all',
  onRecordQuizResult,
  onNavigateToTab,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>(initialTopic);
  const [quizLength, setQuizLength] = useState<10 | 25>(10);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<QuizQuestion[]>([]);

  // Generator for dynamic questions if needed from STUDY_ITEMS as backup/supplement
  const buildQuestionPool = (topic: TopicId | 'all'): QuizQuestion[] => {
    let pool = topic === 'all' 
      ? [...QUIZ_QUESTIONS] 
      : QUIZ_QUESTIONS.filter((q) => q.topicId === topic);

    // If topic has fewer questions than needed, generate dynamic matching questions from STUDY_ITEMS
    if (pool.length < quizLength) {
      const topicItems = topic === 'all' 
        ? STUDY_ITEMS 
        : STUDY_ITEMS.filter((i) => i.topicId === topic);

      const itemsShuffled = [...topicItems].sort(() => 0.5 - Math.random());
      itemsShuffled.forEach((item, idx) => {
        if (pool.some((q) => q.studyItemId === item.id)) return;
        const otherItems = topicItems.filter((i) => i.id !== item.id);
        const distractors = otherItems.sort(() => 0.5 - Math.random()).slice(0, 3);
        if (distractors.length < 3) return;

        const options = [item.definition, ...distractors.map((d) => d.definition)];
        // Shuffle options
        const shuffledOpts = options
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);

        pool.push({
          id: `dyn-${item.id}-${idx}`,
          studyItemId: item.id,
          topicId: item.topicId,
          type: 'concept',
          question: `Which definition precisely matches the geological term "${item.term}"?`,
          options: shuffledOpts,
          correctIndex: shuffledOpts.indexOf(item.definition),
          explanation: `${item.term}: ${item.definition} (Exam Review PDF p.${item.pdfPage})`,
          pdfPage: item.pdfPage,
        });
      });
    }

    return pool.sort(() => 0.5 - Math.random());
  };

  const startQuiz = (count: 10 | 25, topic: TopicId | 'all' = selectedTopic) => {
    sound.playFlip();
    const pool = buildQuestionPool(topic);
    const selected = pool.slice(0, Math.min(count, pool.length));
    setActiveQuiz(selected);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setMissedQuestions([]);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    const currentQ = activeQuiz[currentIdx];
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sound.playIncorrect();
      setMissedQuestions((prev) => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    sound.playFlip();
    if (currentIdx + 1 < activeQuiz.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Finished quiz
      setQuizFinished(true);
      const finalScore = score + (selectedOpt === activeQuiz[currentIdx].correctIndex ? 1 : 0);
      const title = selectedTopic === 'all' ? `General Exam (${activeQuiz.length} Qs)` : `${TOPICS.find((t) => t.id === selectedTopic)?.shortName} Quiz`;
      onRecordQuizResult(title, finalScore, activeQuiz.length, selectedTopic);

      // Trigger celebratory confetti if score >= 80%
      const pct = (finalScore / activeQuiz.length) * 100;
      if (pct >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const currentQuestion = activeQuiz[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Quiz Initial State / Launcher */}
      {activeQuiz.length === 0 || quizFinished ? (
        <div className="space-y-6">
          {quizFinished ? (
            /* Results Presentation */
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-md text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Quiz Completed
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white mt-1">
                  You scored {score} out of {activeQuiz.length}
                </h2>
                <div className="text-4xl font-extrabold font-mono text-amber-600 dark:text-amber-400 mt-2">
                  {Math.round((score / activeQuiz.length) * 100)}%
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mt-2">
                  {(score / activeQuiz.length) >= 0.8
                    ? 'Excellent mastery! Your taphonomic and stratigraphic concepts are solid for Exam 2.'
                    : 'Good practice! Review the missed concepts in the flashcards to lock in key definitions.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => startQuiz(quizLength, selectedTopic)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={() => onNavigateToTab('cards')}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  Review Flashcards
                </button>
                <button
                  onClick={() => onNavigateToTab('dashboard')}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-600 text-stone-700 dark:text-stone-300 font-medium text-sm hover:bg-stone-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  View Dashboard
                </button>
              </div>

              {/* Missed questions review */}
              {missedQuestions.length > 0 && (
                <div className="text-left pt-6 border-t border-stone-100 dark:border-slate-700 space-y-3">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    Concepts to Review ({missedQuestions.length})
                  </h3>
                  <div className="space-y-3">
                    {missedQuestions.map((q) => (
                      <div key={q.id} className="p-4 rounded-xl bg-stone-50 dark:bg-slate-750 border border-stone-200/80 dark:border-slate-700/80 text-xs space-y-1">
                        <div className="font-semibold text-stone-900 dark:text-white">{q.question}</div>
                        <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                          Correct: {q.options[q.correctIndex]}
                        </div>
                        <div className="text-stone-500 dark:text-stone-400 mt-1">{q.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Configuration Menu */
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                    GEOL 1420 Exam Simulator
                  </h1>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Faithfully curated from the official 7-page review sheet. Practice under realistic exam conditions.
                  </p>
                </div>
              </div>

              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Select Question Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedTopic('all')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTopic === 'all'
                        ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-stone-900 dark:text-white shadow-2xs'
                        : 'border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-600 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs">All Topics Combined</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      Full coverage of all 7 chapters
                    </div>
                  </button>

                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedTopic === topic.id
                          ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-stone-900 dark:text-white shadow-2xs'
                          : 'border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-600 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <div className="font-bold text-xs truncate">{topic.shortName}</div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {topic.pdfPages}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Length */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Number of Questions
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setQuizLength(10)}
                    className={`py-3 px-4 rounded-xl border font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                      quizLength === 10
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-amber-500 dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                        : 'border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    Quick Drill (10 Questions)
                  </button>
                  <button
                    onClick={() => setQuizLength(25)}
                    className={`py-3 px-4 rounded-xl border font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                      quizLength === 25
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-amber-500 dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                        : 'border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    Exam Simulator (25 Questions)
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-slate-700">
                <button
                  onClick={() => startQuiz(quizLength, selectedTopic)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  Begin Exam Practice
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active Quiz Question Screen */
        <div className="space-y-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Question {currentIdx + 1} of {activeQuiz.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono">Current Score: {score}</span>
              <span className="text-stone-300 dark:text-stone-600">|</span>
              <span className="text-amber-700 dark:text-amber-400 font-medium">
                {TOPICS.find((t) => t.id === currentQuestion.topicId)?.shortName || 'Geology'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / activeQuiz.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-slate-700 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                  Review PDF Page {currentQuestion.pdfPage}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  let optStyle = 'border-stone-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200';
                  let icon = null;

                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs';
                      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (idx === selectedOpt) {
                      optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 font-semibold';
                      icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
                    } else {
                      optStyle = 'opacity-40 border-stone-200 dark:border-slate-700 text-stone-500 dark:text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer text-sm sm:text-base leading-relaxed ${optStyle}`}
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

              {/* Explanation Card upon Answer */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                    <Sparkles className="w-4 h-4" />
                    Official Review Explanation (Page {currentQuestion.pdfPage})
                  </div>
                  <p className="leading-relaxed">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 font-bold text-sm transition-all hover:bg-stone-800 dark:hover:bg-amber-400 flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{currentIdx + 1 === activeQuiz.length ? 'View Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
