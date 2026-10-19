export type TopicId = 
  | 'taphonomy'
  | 'preservation'
  | 'evolution'
  | 'classification'
  | 'cladistics'
  | 'stratigraphy'
  | 'isotopes';

export interface TopicInfo {
  id: TopicId;
  name: string;
  shortName: string;
  badgeColor: string; // Tailwind class
  accentHex: string;
  pdfPages: string;
  description: string;
}

export interface StudyItem {
  id: string;
  topicId: TopicId;
  topicName: string;
  term: string;
  definition: string;
  pdfPage: number;
  highlight?: string;
  exampleOrNote?: string;
  tags?: string[];
}

export type MasteryLevel = 'unseen' | 'learning' | 'reviewing' | 'mastered';

export interface QuizQuestion {
  id: string;
  studyItemId?: string;
  topicId: TopicId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pdfPage: number;
  type: 'concept' | 'scenario' | 'application';
}

export interface UserEngagementState {
  studyMinutes: number;
  cardsStudiedCount: number;
  quizzesTaken: number;
  learnQuestionsAnswered: number;
  speedMatchPlays: number;
  streakDays: number;
  lastActiveDate: string;
  cardMastery: Record<string, MasteryLevel>;
  termCorrectStreaks: Record<string, number>; // tracks consecutive correct answers (needs 2 for mastered)
  bookmarkedCards: Record<string, boolean>;
  quizHistory: {
    id: string;
    timestamp: number;
    title: string;
    score: number;
    total: number;
    percentage: number;
    topicId: TopicId | 'all';
  }[];
  recentActivity: {
    id: string;
    timestamp: number;
    action: string;
    detail: string;
  }[];
  speedMatchBestScore: number;
}
