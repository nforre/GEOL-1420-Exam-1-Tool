import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  Layers
} from 'lucide-react';
import { TopicId, StudyItem, MasteryLevel } from '../types';
import { TOPICS, STUDY_ITEMS } from '../data/geologyData';
import { sound } from '../utils/sound';

interface StudyGuideViewProps {
  initialTopic?: TopicId | 'all';
  cardMastery: Record<string, MasteryLevel>;
  bookmarkedCards: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onUpdateMastery: (id: string, level: MasteryLevel) => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  initialTopic = 'all',
  cardMastery,
  bookmarkedCards,
  onToggleBookmark,
  onUpdateMastery,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<TopicId | 'all'>(initialTopic);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const filteredItems = useMemo(() => {
    return STUDY_ITEMS.filter((item) => {
      const matchesTopic = activeTopic === 'all' || item.topicId === activeTopic;
      const matchesBookmark = !onlyBookmarked || !!bookmarkedCards[item.id];
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        (item.highlight && item.highlight.toLowerCase().includes(query)) ||
        (item.exampleOrNote && item.exampleOrNote.toLowerCase().includes(query));

      return matchesTopic && matchesBookmark && matchesSearch;
    });
  }, [activeTopic, onlyBookmarked, searchQuery, bookmarkedCards]);

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            Complete Exam 2 Reference Guide
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Every concept, definition, and taphonomic note from pages 1 through 7 of the GEOL 1420 review sheet.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, minerals (zircon), processes (pyritization), or rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyBookmarked((prev) => !prev)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlyBookmarked
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                  : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-750'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-current' : ''}`} />
              Flagged Only
            </button>
          </div>
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setActiveTopic('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTopic === 'all'
                ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
            }`}
          >
            All Chapters ({STUDY_ITEMS.length})
          </button>

          {TOPICS.map((topic) => {
            const isSelected = activeTopic === topic.id;
            const count = STUDY_ITEMS.filter((i) => i.topicId === topic.id).length;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
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

      {/* Results Count */}
      <div className="text-xs text-stone-400 font-medium">
        Showing {filteredItems.length} concepts
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isBookmarked = !!bookmarkedCards[item.id];
          const mastery = cardMastery[item.id] || 'unseen';

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:border-amber-400/60 dark:hover:border-amber-500/60 transition-all shadow-2xs space-y-2.5 relative"
            >
              {/* Top row: Topic tag, PDF page, and actions */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300">
                    {item.topicName}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    PDF Page {item.pdfPage}
                  </span>
                  {mastery === 'mastered' && (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Mastered
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(`${item.term}. ${item.definition}`)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
                    title="Read aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playFlip();
                      onToggleBookmark(item.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-700'
                    }`}
                    title={isBookmarked ? 'Unstar' : 'Bookmark for priority review'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Term & Definition */}
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  {item.term}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mt-1">
                  {item.definition}
                </p>
              </div>

              {/* Highlights & Examples */}
              {(item.highlight || item.exampleOrNote) && (
                <div className="pt-2 border-t border-stone-100 dark:border-slate-700/60 flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-stone-500 dark:text-stone-400">
                  {item.highlight && (
                    <div>
                      <strong className="font-semibold text-amber-700 dark:text-amber-400">Key Takeaway: </strong>
                      {item.highlight}
                    </div>
                  )}
                  {item.exampleOrNote && (
                    <div>
                      <strong className="font-semibold text-stone-700 dark:text-stone-300">Examples: </strong>
                      {item.exampleOrNote}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-16 text-center rounded-2xl border border-dashed border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800">
            <BookOpen className="w-8 h-8 mx-auto text-stone-400 mb-2" />
            <div className="text-sm font-semibold text-stone-800 dark:text-white">
              No matching terms found
            </div>
            <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 mb-3">
              Try adjusting your search query or clear the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTopic('all'); setOnlyBookmarked(false); }}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-semibold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
