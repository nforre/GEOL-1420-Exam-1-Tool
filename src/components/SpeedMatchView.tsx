import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Zap, RotateCcw, Trophy, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { STUDY_ITEMS } from '../data/geologyData';
import { sound } from '../utils/sound';

interface MatchTile {
  id: string; // unique tile id
  itemId: string; // parent study item id
  text: string;
  type: 'term' | 'def';
}

interface SpeedMatchViewProps {
  bestScore: number;
  onRecordScore: (score: number) => void;
}

export const SpeedMatchView: React.FC<SpeedMatchViewProps> = ({
  bestScore,
  onRecordScore,
}) => {
  const [tiles, setTiles] = useState<MatchTile[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [matchedItemIds, setMatchedItemIds] = useState<Set<string>>(new Set());
  const [wrongTileIds, setWrongTileIds] = useState<string[]>([]);
  const [timerSec, setTimerSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  // Initialize a new round with 6 pairs
  const startNewGame = () => {
    sound.playFlip();
    const shuffledItems = [...STUDY_ITEMS].sort(() => 0.5 - Math.random()).slice(0, 6);
    const newTiles: MatchTile[] = [];

    shuffledItems.forEach((item) => {
      // Shorten definition slightly for tile readability if needed
      const defSnippet = item.definition.length > 90 
        ? item.definition.slice(0, 85) + '...' 
        : item.definition;

      newTiles.push({
        id: `term-${item.id}`,
        itemId: item.id,
        text: item.term,
        type: 'term'
      });
      newTiles.push({
        id: `def-${item.id}`,
        itemId: item.id,
        text: defSnippet,
        type: 'def'
      });
    });

    // Shuffle tiles
    setTiles(newTiles.sort(() => 0.5 - Math.random()));
    setSelectedTileId(null);
    setMatchedItemIds(new Set());
    setWrongTileIds([]);
    setTimerSec(0);
    setIsRunning(true);
    setIsGameOver(false);
    setStreak(0);
  };

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isGameOver) {
      interval = setInterval(() => {
        setTimerSec((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isGameOver]);

  // Handle tile click
  const handleTileClick = (tile: MatchTile) => {
    if (!isRunning || isGameOver) return;
    if (matchedItemIds.has(tile.itemId)) return; // already solved
    if (wrongTileIds.length > 0) return; // animating error

    sound.playFlip();

    // If nothing currently selected, select this one
    if (!selectedTileId) {
      setSelectedTileId(tile.id);
      return;
    }

    // If clicked the same tile, deselect
    if (selectedTileId === tile.id) {
      setSelectedTileId(null);
      return;
    }

    const firstTile = tiles.find((t) => t.id === selectedTileId);
    if (!firstTile) return;

    // Check if both are same item and different types (one term, one def)
    if (firstTile.itemId === tile.itemId && firstTile.type !== tile.type) {
      // MATCH!
      sound.playMatchSuccess();
      const updated = new Set(matchedItemIds);
      updated.add(tile.itemId);
      setMatchedItemIds(updated);
      setSelectedTileId(null);
      setStreak((s) => s + 1);

      // Check if all 6 pairs matched
      if (updated.size === 6) {
        setIsRunning(false);
        setIsGameOver(true);
        const finalTime = timerSec + 1;
        // Score based on speed: base 1000 minus seconds taken
        const scoreEarned = Math.max(100, 1000 - finalTime * 15 + streak * 50);
        onRecordScore(scoreEarned);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } else {
      // MISMATCH
      sound.playIncorrect();
      setWrongTileIds([firstTile.id, tile.id]);
      setStreak(0);
      setTimeout(() => {
        setWrongTileIds([]);
        setSelectedTileId(null);
      }, 700);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
            Geological Speed Match
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Pair terms with their exact exam review definitions as quickly as possible!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-sm font-bold">{timerSec}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Best: <strong className="font-mono">{bestScore}</strong> pts</span>
          </div>

          <button
            onClick={startNewGame}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isRunning ? 'Restart' : 'New Match'}
          </button>
        </div>
      </div>

      {/* Main Game Stage */}
      {!isRunning && !isGameOver ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            Ready to test your geological recall?
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
            Match 6 term cards to their definitions. Build streaks for bonus points. Great for active recall before test day.
          </p>
          <div className="pt-2">
            <button
              onClick={startNewGame}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base transition-all shadow-md cursor-pointer"
            >
              Start Speed Match
            </button>
          </div>
        </div>
      ) : isGameOver ? (
        <div className="p-10 text-center rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-md space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Set Completed
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              All 6 Pairs Cleared in {timerSec}s!
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
              Earned {Math.max(100, 1000 - timerSec * 15 + streak * 50)} points.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={startNewGame}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Next Round
            </button>
          </div>
        </div>
      ) : (
        /* Tile Grid (12 items: 3 columns on small screen, 4 on medium/large) */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tiles.map((tile) => {
            const isMatched = matchedItemIds.has(tile.itemId);
            const isSelected = selectedTileId === tile.id;
            const isWrong = wrongTileIds.includes(tile.id);

            let tileClasses = 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-stone-800 dark:text-stone-200 hover:border-amber-400';

            if (isMatched) {
              tileClasses = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 opacity-60 cursor-default';
            } else if (isWrong) {
              tileClasses = 'bg-red-50 dark:bg-red-950/40 border-red-400 text-red-900 dark:text-red-200 animate-shake';
            } else if (isSelected) {
              tileClasses = 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-stone-900 dark:text-white ring-2 ring-amber-400/50';
            }

            return (
              <motion.button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                disabled={isMatched}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                className={`p-4 rounded-2xl border-2 text-left min-h-[110px] flex flex-col justify-between transition-colors shadow-2xs select-none cursor-pointer ${tileClasses}`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider opacity-60 mb-2">
                  <span>{tile.type === 'term' ? 'Concept Term' : 'Definition'}</span>
                  {isMatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>

                <div className={`text-xs sm:text-sm font-medium leading-snug line-clamp-4 ${tile.type === 'term' ? 'font-bold text-stone-900 dark:text-white' : ''}`}>
                  {tile.text}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};
