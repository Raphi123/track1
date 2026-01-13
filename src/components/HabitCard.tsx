import { Flame, Trash2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Habit } from '@/hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  last7Days: boolean[];
  isCompletedToday: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const HabitCard = ({
  habit,
  streak,
  last7Days,
  isCompletedToday,
  onToggle,
  onDelete,
}: HabitCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-card border border-border rounded-2xl p-4 transition-colors"
    >
      <div className="flex items-start gap-4">
        {/* Check Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
            isCompletedToday
              ? 'gradient-accent animate-check-bounce'
              : 'bg-muted hover:bg-muted/80 border-2 border-dashed border-border'
          }`}
        >
          <AnimatePresence mode="wait">
            {isCompletedToday ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-6 h-6 text-accent-foreground" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6 rounded-full border-2 border-muted-foreground/30"
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-foreground truncate">{habit.name}</h3>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between">
            {/* Streak */}
            <div className="flex items-center gap-1.5">
              <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${streak > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {streak} day{streak !== 1 ? 's' : ''}
              </span>
            </div>

            {/* 7 Day History */}
            <div className="flex items-center gap-1">
              {last7Days.map((completed, index) => (
                <div key={index} className="flex flex-col items-center gap-0.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-medium transition-colors ${
                      completed
                        ? 'gradient-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {dayLabels[(new Date().getDay() - 6 + index + 7) % 7]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
