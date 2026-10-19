import { UserEngagementState, MasteryLevel, TopicId } from '../types';
import { STUDY_ITEMS } from '../data/geologyData';

const STORAGE_KEY = 'geol_1420_engagement_v2';

export const getTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export const getDefaultEngagementState = (): UserEngagementState => {
  const defaultMastery: Record<string, MasteryLevel> = {};
  const defaultStreaks: Record<string, number> = {};

  STUDY_ITEMS.forEach(item => {
    defaultMastery[item.id] = 'unseen';
    defaultStreaks[item.id] = 0;
  });

  return {
    studyMinutes: 15,
    cardsStudiedCount: 0,
    quizzesTaken: 1,
    learnQuestionsAnswered: 6,
    speedMatchPlays: 0,
    streakDays: 1,
    lastActiveDate: getTodayKey(),
    cardMastery: defaultMastery,
    termCorrectStreaks: defaultStreaks,
    bookmarkedCards: {},
    quizHistory: [
      {
        id: 'initial-sample',
        timestamp: Date.now() - 3600000 * 2,
        title: 'Diagnostic Pre-Quiz',
        score: 4,
        total: 5,
        percentage: 80,
        topicId: 'taphonomy'
      }
    ],
    recentActivity: [
      {
        id: 'act-1',
        timestamp: Date.now() - 3600000 * 2,
        action: 'Diagnostic Quiz',
        detail: 'Scored 80% on Taphonomy diagnostic'
      },
      {
        id: 'act-2',
        timestamp: Date.now() - 3600000 * 3,
        action: 'Study Session Started',
        detail: 'Initiated GEOL 1420 Exam 2 review module'
      }
    ],
    speedMatchBestScore: 0
  };
};

export const loadEngagementState = (): UserEngagementState => {
  if (typeof window === 'undefined') return getDefaultEngagementState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultEngagementState();
      saveEngagementState(def);
      return def;
    }
    const parsed = JSON.parse(raw) as UserEngagementState;

    if (!parsed.termCorrectStreaks) {
      parsed.termCorrectStreaks = {};
    }
    if (parsed.learnQuestionsAnswered === undefined) {
      parsed.learnQuestionsAnswered = 0;
    }

    // ensure all study item keys exist
    STUDY_ITEMS.forEach(item => {
      if (!parsed.cardMastery[item.id]) {
        parsed.cardMastery[item.id] = 'unseen';
      }
      if (parsed.termCorrectStreaks[item.id] === undefined) {
        parsed.termCorrectStreaks[item.id] = parsed.cardMastery[item.id] === 'mastered' ? 2 : 0;
      }
    });

    // Check streak
    const today = getTodayKey();
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currDate = new Date(today);
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;
    }

    return parsed;
  } catch (e) {
    console.error('Failed to load engagement state:', e);
    return getDefaultEngagementState();
  }
};

export const saveEngagementState = (state: UserEngagementState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save engagement state:', e);
  }
};

/**
 * Updates a term's mastery level according to Quizlet-style Learn rules:
 * - Answered correctly twice in a row (streak >= 2) -> "mastered"
 * - Answered correctly once (streak === 1) -> "reviewing"
 * - Answered incorrectly when previously right (streak > 0 or previously mastered/reviewing) -> changed to "reviewing" (needs review), streak resets to 0
 * - Answered incorrectly when never right before -> flagged as "learning", streak resets to 0
 */
export const updateTermOnAnswer = (
  state: UserEngagementState,
  termId: string,
  isCorrect: boolean
): { nextState: UserEngagementState; newLevel: MasteryLevel; newStreak: number } => {
  const currentLevel = state.cardMastery[termId] || 'unseen';
  const currentStreak = state.termCorrectStreaks[termId] || 0;

  let newLevel: MasteryLevel = currentLevel;
  let newStreak = currentStreak;

  if (isCorrect) {
    newStreak = currentStreak + 1;
    if (newStreak >= 2) {
      newLevel = 'mastered';
    } else {
      newLevel = 'reviewing';
    }
  } else {
    // Incorrect answer
    const previouslyGotRight = currentStreak > 0 || currentLevel === 'mastered' || currentLevel === 'reviewing';
    if (previouslyGotRight) {
      newLevel = 'reviewing'; // Got wrong after having gotten it right before -> reviewing (Needs Review)
    } else {
      newLevel = 'learning'; // Never gotten right -> flagged as learning
    }
    newStreak = 0;
  }

  const nextState: UserEngagementState = {
    ...state,
    cardMastery: {
      ...state.cardMastery,
      [termId]: newLevel,
    },
    termCorrectStreaks: {
      ...state.termCorrectStreaks,
      [termId]: newStreak,
    },
  };

  return { nextState, newLevel, newStreak };
};

export const calculateReadinessScore = (state: UserEngagementState): number => {
  const totalCards = STUDY_ITEMS.length;
  if (totalCards === 0) return 0;

  let termPoints = 0;
  Object.values(state.cardMastery).forEach(level => {
    if (level === 'mastered') termPoints += 1.0;
    else if (level === 'reviewing') termPoints += 0.55;
    else if (level === 'learning') termPoints += 0.20;
  });

  const termMasteryPct = (termPoints / totalCards) * 100;

  // Practice exam accuracy factor
  let avgQuizPct = 65;
  if (state.quizHistory.length > 0) {
    const sum = state.quizHistory.reduce((acc, q) => acc + q.percentage, 0);
    avgQuizPct = sum / state.quizHistory.length;
  }

  // Activity weight (Mastery 55%, Exam Accuracy 35%, Practice Volume 10%)
  const volumeBonus = Math.min(10, ((state.learnQuestionsAnswered + state.quizzesTaken * 5) / 10));

  const finalScore = Math.round((termMasteryPct * 0.55) + (avgQuizPct * 0.35) + volumeBonus);
  return Math.max(0, Math.min(100, finalScore));
};

export const getTopicMasteryBreakdown = (
  state: UserEngagementState,
  topicId: TopicId
): { mastered: number; learning: number; reviewing: number; unseen: number; total: number; percent: number } => {
  const items = STUDY_ITEMS.filter(it => it.topicId === topicId);
  const total = items.length;
  let mastered = 0;
  let learning = 0;
  let reviewing = 0;
  let unseen = 0;

  items.forEach(it => {
    const status = state.cardMastery[it.id] || 'unseen';
    if (status === 'mastered') mastered++;
    else if (status === 'reviewing') reviewing++;
    else if (status === 'learning') learning++;
    else unseen++;
  });

  const points = (mastered * 1.0) + (reviewing * 0.55) + (learning * 0.20);
  const percent = total > 0 ? Math.round((points / total) * 100) : 0;

  return { mastered, learning, reviewing, unseen, total, percent };
};
