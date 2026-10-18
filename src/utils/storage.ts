import { UserEngagementState, MasteryLevel, TopicId } from '../types';
import { STUDY_ITEMS } from '../data/geologyData';

const STORAGE_KEY = 'geol_1420_engagement_v1';

export const getTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export const getDefaultEngagementState = (): UserEngagementState => {
  const defaultMastery: Record<string, MasteryLevel> = {};
  STUDY_ITEMS.forEach(item => {
    defaultMastery[item.id] = 'unseen';
  });

  return {
    studyMinutes: 12, // starting baseline so dashboard has meaningful initial progress
    cardsStudiedCount: 8,
    quizzesTaken: 1,
    speedMatchPlays: 0,
    streakDays: 1,
    lastActiveDate: getTodayKey(),
    cardMastery: defaultMastery,
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
    // ensure all study item keys exist
    STUDY_ITEMS.forEach(item => {
      if (!parsed.cardMastery[item.id]) {
        parsed.cardMastery[item.id] = 'unseen';
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

export const calculateReadinessScore = (state: UserEngagementState): number => {
  const totalCards = STUDY_ITEMS.length;
  if (totalCards === 0) return 0;

  let cardPoints = 0;
  Object.values(state.cardMastery).forEach(level => {
    if (level === 'mastered') cardPoints += 1.0;
    else if (level === 'reviewing') cardPoints += 0.65;
    else if (level === 'learning') cardPoints += 0.35;
  });

  const cardMasteryPct = (cardPoints / totalCards) * 100;

  // Quiz factor
  let avgQuizPct = 70;
  if (state.quizHistory.length > 0) {
    const sum = state.quizHistory.reduce((acc, q) => acc + q.percentage, 0);
    avgQuizPct = sum / state.quizHistory.length;
  }

  // Activity bonus
  const activityBonus = Math.min(15, (state.cardsStudiedCount / 10) + (state.quizzesTaken * 2));

  // Weighted readiness: 50% card mastery, 40% quiz performance, 10% activity bonus
  const finalScore = Math.round((cardMasteryPct * 0.5) + (avgQuizPct * 0.4) + Math.min(10, activityBonus));
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

  const points = (mastered * 1.0) + (reviewing * 0.65) + (learning * 0.35);
  const percent = total > 0 ? Math.round((points / total) * 100) : 0;

  return { mastered, learning, reviewing, unseen, total, percent };
};
