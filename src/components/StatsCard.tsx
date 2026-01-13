import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  completionRate: number;
  totalHabits: number;
}

export const StatsCard = ({ completionRate, totalHabits }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-primary rounded-2xl p-5 text-primary-foreground"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-90">Weekly Progress</p>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="opacity-90">Completion</span>
          <span className="font-medium">{totalHabits} habits tracked</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-white/90 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
