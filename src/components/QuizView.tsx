import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  BrainCircuit, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Flag,
  Sliders,
  Check,
  Layers,
  HelpCircle
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
  // Setup configuration state
  const [selectedTopics, setSelectedTopics] = useState<TopicId[]>(
    initialTopic === 'all' ? TOPICS.map((t) => t.id) : [initialTopic]
  );
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [examMode, setExamMode] = useState<'tutor' | 'simulation'>('tutor');
  const [enableTimer, setEnableTimer] = useState<boolean>(false);
  const [timeRemainingSec, setTimeRemainingSec] = useState<number>(0);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({}); // qIndex -> optionIndex
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isExamActive, setIsExamActive] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Total possible question pool size across selected topics
  const fullPoolCount = useMemo(() => {
    // base hand-crafted questions
    const baseCount = QUIZ_QUESTIONS.filter((q) => selectedTopics.includes(q.topicId)).length;
    // study items in selected topics
    const studyItemsCount = STUDY_ITEMS.filter((i) => selectedTopics.includes(i.topicId)).length;
    return Math.max(baseCount, studyItemsCount);
  }, [selectedTopics]);

  // Adjust question count if exceeds pool
  useEffect(() => {
    if (questionCount > fullPoolCount && fullPoolCount > 0) {
      setQuestionCount(fullPoolCount);
    }
  }, [fullPoolCount, questionCount]);

  // Generator for questions
  const generateExamQuestions = (count: number, topics: TopicId[]): QuizQuestion[] => {
    let pool: QuizQuestion[] = QUIZ_QUESTIONS.filter((q) => topics.includes(q.topicId));

    // If we need more questions than hand-crafted ones, synthesize from STUDY_ITEMS
    const needed = count - pool.length;
    if (needed > 0) {
      const topicItems = STUDY_ITEMS.filter((i) => topics.includes(i.topicId));
      const shuffledItems = [...topicItems].sort(() => 0.5 - Math.random());

      shuffledItems.forEach((item, idx) => {
        if (pool.length >= count) return;
        if (pool.some((q) => q.studyItemId === item.id)) return;

        const otherItems = topicItems.filter((i) => i.id !== item.id);
        const distractors = otherItems.sort(() => 0.5 - Math.random()).slice(0, 3);
        if (distractors.length < 3) return;

        const options = [item.definition, ...distractors.map((d) => d.definition)];
        const shuffledOpts = options
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);

        pool.push({
          id: `synth-${item.id}-${idx}`,
          studyItemId: item.id,
          topicId: item.topicId,
          type: 'concept',
          question: `Which definition accurately describes "${item.term}"?`,
          options: shuffledOpts,
          correctIndex: shuffledOpts.indexOf(item.definition),
          explanation: `${item.term}: ${item.definition} (Official Exam Review Sheet p.${item.pdfPage})`,
          pdfPage: item.pdfPage,
        });
      });
    }

    // Shuffle final pool and slice to exact count
    return pool.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const handleStartExam = () => {
    sound.playFlip();
    const questions = generateExamQuestions(questionCount, selectedTopics);
    setActiveQuiz(questions);
    setCurrentIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setIsExamActive(true);
    setExamFinished(false);

    if (enableTimer) {
      // 90 seconds per question
      setTimeRemainingSec(questions.length * 90);
    }
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isExamActive && !examFinished && enableTimer && timeRemainingSec > 0) {
      interval = setInterval(() => {
        setTimeRemainingSec((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExamActive, examFinished, enableTimer, timeRemainingSec]);

  const handleSelectOption = (optIdx: number) => {
    if (examFinished) return;
    sound.playFlip();
    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));

    if (examMode === 'tutor') {
      const isCorrect = optIdx === activeQuiz[currentIdx].correctIndex;
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }
  };

  const handleToggleFlag = (idx: number) => {
    sound.playFlip();
    setFlaggedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    setIsExamActive(false);

    // Calculate score
    let correctCount = 0;
    activeQuiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const topicLabel = selectedTopics.length === TOPICS.length 
      ? 'Custom Exam' 
      : `${selectedTopics.length} Topics Exam`;
    const title = `${topicLabel} (${activeQuiz.length} Questions)`;

    onRecordQuizResult(
      title,
      correctCount,
      activeQuiz.length,
      selectedTopics.length === 1 ? selectedTopics[0] : 'all'
    );

    const pct = (correctCount / activeQuiz.length) * 100;
    if (pct >= 80) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  };

  const toggleTopicSelection = (topicId: TopicId) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topicId)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((t) => t !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const selectAllTopics = () => {
    setSelectedTopics(TOPICS.map((t) => t.id));
  };

  // Current question data
  const currentQ = activeQuiz[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;
  const currentSelectedOpt = userAnswers[currentIdx];
  const isCurrentAnswered = currentSelectedOpt !== undefined;

  // Calculate final score when finished
  const finalScore = useMemo(() => {
    if (!examFinished) return 0;
    return activeQuiz.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [examFinished, activeQuiz, userAnswers]);

  const finalPct = activeQuiz.length > 0 ? Math.round((finalScore / activeQuiz.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* State 1: Configuration & Customizer Setup */}
      {!isExamActive && !examFinished && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-[#708865]/40 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-slate-700/80 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf1e6] dark:bg-emerald-950/40 text-[#44543d] dark:text-emerald-300 text-xs font-bold mb-2">
                <Sliders className="w-3.5 h-3.5" />
                Custom Practice Exam Builder
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-vintage font-bold tracking-tight text-stone-900 dark:text-white">
                Customize Your Exam Review
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-xl">
                Configure your question count, chapter topics, feedback mode, and timing to mirror your exam prep needs.
              </p>
            </div>
            <div className="hidden sm:block p-3 rounded-2xl bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
              <BrainCircuit className="w-8 h-8" />
            </div>
          </div>

          {/* Section: Number of Questions Customizer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Number of Questions
              </label>
              <div className="text-sm font-mono font-bold px-3 py-1 rounded-lg bg-[#eaf1e6] dark:bg-slate-700 text-[#3d4f36] dark:text-emerald-300">
                {questionCount} Questions Selected
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 20, 25, 30, 40].map((count) => {
                const disabled = count > fullPoolCount;
                return (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    disabled={disabled}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      questionCount === count
                        ? 'bg-[#5c7054] text-white shadow-xs'
                        : disabled
                        ? 'opacity-30 bg-stone-100 dark:bg-slate-800 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {count} Qs
                  </button>
                );
              })}
              <button
                onClick={() => setQuestionCount(fullPoolCount)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  questionCount === fullPoolCount
                    ? 'bg-[#5c7054] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-600'
                }`}
              >
                Max ({fullPoolCount} Qs)
              </button>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="5"
                max={Math.max(5, fullPoolCount)}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-[#5c7054] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                <span>5 Questions</span>
                <span>Max Available ({fullPoolCount})</span>
              </div>
            </div>
          </div>

          {/* Section: Topic Scope Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Chapters & Topics Included ({selectedTopics.length} of {TOPICS.length})
              </label>
              <button
                onClick={selectAllTopics}
                className="text-xs text-[#5c7054] dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                Select All Topics
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPICS.map((topic) => {
                const isChecked = selectedTopics.includes(topic.id);
                const count = STUDY_ITEMS.filter((i) => i.topicId === topic.id).length;
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopicSelection(topic.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isChecked
                        ? 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/30 text-stone-900 dark:text-white shadow-2xs'
                        : 'border-stone-200 dark:border-slate-700 text-stone-500 dark:text-stone-400 hover:border-stone-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{topic.name}</div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {topic.pdfPages} · {count} terms
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border shrink-0 ${
                      isChecked 
                        ? 'bg-[#5c7054] border-[#5c7054] text-white' 
                        : 'border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Mode & Timer Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Feedback Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Feedback Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExamMode('tutor')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    examMode === 'tutor'
                      ? 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="text-xs">Tutor Mode</div>
                  <div className="text-[10px] text-stone-500 font-normal">Instant explanations</div>
                </button>
                <button
                  onClick={() => setExamMode('simulation')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    examMode === 'simulation'
                      ? 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="text-xs">Exam Mode</div>
                  <div className="text-[10px] text-stone-500 font-normal">Score & review at end</div>
                </button>
              </div>
            </div>

            {/* Timer Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Pacing Timer
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEnableTimer(false)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    !enableTimer
                      ? 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="text-xs">Untimed</div>
                  <div className="text-[10px] text-stone-500 font-normal">Study at own pace</div>
                </button>
                <button
                  onClick={() => setEnableTimer(true)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    enableTimer
                      ? 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="text-xs">Timed Exam</div>
                  <div className="text-[10px] text-stone-500 font-normal">90s per question</div>
                </button>
              </div>
            </div>
          </div>

          {/* Action: Launch Exam */}
          <div className="pt-4 border-t border-stone-100 dark:border-slate-700">
            <button
              onClick={handleStartExam}
              className="w-full py-4 px-6 rounded-2xl bg-[#5c7054] hover:bg-[#4d6046] text-white font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Start Practice Exam ({questionCount} Questions)
            </button>
          </div>
        </div>
      )}

      {/* State 2: Active Exam Mode */}
      {isExamActive && currentQ && (
        <div className="space-y-5">
          {/* Top Status Bar: Question Counter, Timer & Navigation Grid */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-900 dark:text-white">
                Question <span className="text-[#5c7054] dark:text-emerald-400 text-sm">{currentIdx + 1}</span> of {activeQuiz.length}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {answeredCount} of {activeQuiz.length} Answered
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Flag Toggle */}
              <button
                onClick={() => handleToggleFlag(currentIdx)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  flaggedQuestions[currentIdx]
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Flag question to review later"
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentIdx] ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Flag for Review</span>
              </button>

              {/* Countdown Timer */}
              {enableTimer && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 dark:bg-slate-700 font-mono text-xs font-bold text-stone-700 dark:text-stone-300">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {Math.floor(timeRemainingSec / 60)}:{(timeRemainingSec % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Finish Exam Button */}
              <button
                onClick={handleFinishExam}
                className="px-3.5 py-1.5 rounded-lg bg-[#c35d45] hover:bg-[#a84c35] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Grid Navigator (Allows jumping to any question) */}
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-stone-200 dark:border-slate-700 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {activeQuiz.map((q, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isFlagged = flaggedQuestions[idx];
              const isCurrent = idx === currentIdx;

              let btnClass = 'bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200';
              if (isCurrent) {
                btnClass = 'ring-2 ring-[#5c7054] bg-[#5c7054] text-white font-bold';
              } else if (isFlagged) {
                btnClass = 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-semibold';
              } else if (isAnswered) {
                btnClass = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-xs shrink-0 transition-all flex items-center justify-center cursor-pointer ${btnClass}`}
                  title={`Jump to Q${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 shadow-md space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#eaf1e6] dark:bg-slate-700 text-[#44543d] dark:text-emerald-300">
                    {TOPICS.find((t) => t.id === currentQ.topicId)?.shortName || 'Historical Geology'}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    Official Review Sheet p.{currentQ.pdfPage}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-vintage tracking-tight text-stone-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = currentSelectedOpt === idx;
                  let optStyle = 'border-stone-200 dark:border-slate-700 hover:border-[#5c7054] bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200';
                  let icon = null;

                  if (examMode === 'tutor' && isCurrentAnswered) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 font-semibold';
                      icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
                    } else {
                      optStyle = 'opacity-40 border-stone-200 dark:border-slate-700 text-stone-500';
                    }
                  } else {
                    if (isSelected) {
                      optStyle = 'border-[#5c7054] bg-[#f2f7ef] dark:bg-emerald-950/40 text-stone-900 dark:text-white font-bold ring-2 ring-[#5c7054]/40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={examMode === 'tutor' && isCurrentAnswered}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer text-sm sm:text-base leading-relaxed ${optStyle}`}
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

              {/* Tutor Mode Immediate Explanation */}
              {examMode === 'tutor' && isCurrentAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-2xl bg-[#f2f7ef] dark:bg-emerald-950/40 border border-[#708865]/40 text-xs sm:text-sm text-[#2f3d2a] dark:text-emerald-200 space-y-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 text-[#3d4f36] dark:text-emerald-300">
                    <Sparkles className="w-4 h-4" />
                    Review Sheet Explanation (Page {currentQ.pdfPage})
                  </div>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                </motion.div>
              )}

              {/* Bottom Nav: Prev / Next */}
              <div className="pt-2 border-t border-stone-100 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-slate-750 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="text-xs text-stone-400 font-mono">
                  {currentIdx + 1} / {activeQuiz.length}
                </div>

                {currentIdx + 1 < activeQuiz.length ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#5c7054] text-white hover:bg-[#4d6046] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    className="px-5 py-2.5 rounded-xl bg-[#c35d45] hover:bg-[#a84c35] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    Finish Exam
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* State 3: Exam Results & Review */}
      {examFinished && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-[#708865]/40 dark:border-slate-700 shadow-md text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#eaf1e6] dark:bg-emerald-950/40 text-[#44543d] dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Exam Simulation Complete
              </span>
              <h2 className="text-3xl font-bold font-serif-vintage tracking-tight text-stone-900 dark:text-white mt-1">
                Score: {finalScore} / {activeQuiz.length} ({finalPct}%)
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mt-2">
                {finalPct >= 85
                  ? 'Outstanding readiness! You have mastered the taphonomic and stratigraphic concepts for Exam 2.'
                  : finalPct >= 70
                  ? 'Solid foundation! Review the flagged and missed concepts below to ensure an A on test day.'
                  : 'Keep studying! Focus on the specific chapters and terms where you missed points below.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setExamFinished(false);
                  setIsExamActive(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#5c7054] hover:bg-[#4d6046] text-white font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Customize New Exam
              </button>
              <button
                onClick={() => onNavigateToTab('cards')}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold text-sm transition-all cursor-pointer"
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
          </div>

          {/* Detailed Question Review Breakdown */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Full Exam Questions Review ({activeQuiz.length})
            </h3>

            <div className="space-y-4">
              {activeQuiz.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-red-200 bg-red-50/50 dark:bg-red-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-stone-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-stone-600 dark:text-stone-300">
                        <strong>Your Answer:</strong>{' '}
                        {userChoice !== undefined ? q.options[userChoice] : 'Unanswered'}
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                          <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-stone-200/80 dark:border-slate-700/80 text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed mt-2">
                      <strong>Exam Sheet Citation (Page {q.pdfPage}):</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
