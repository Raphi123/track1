import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-4 opacity-50">
        <Target className="w-10 h-10 text-primary-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No habits yet</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Start building better habits by adding your first one above!
      </p>
    </motion.div>
  );
};
