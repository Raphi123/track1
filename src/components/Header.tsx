import { Moon, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Habit Tracker</h1>
          <p className="text-xs text-muted-foreground">Build better habits</p>
        </div>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleTheme}
        className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center transition-colors hover:bg-muted"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-primary" />
        ) : (
          <Sun className="w-5 h-5 text-accent" />
        )}
      </motion.button>
    </header>
  );
};
