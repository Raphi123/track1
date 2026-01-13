import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { AddHabitForm } from '@/components/AddHabitForm';
import { HabitCard } from '@/components/HabitCard';
import { EmptyState } from '@/components/EmptyState';
import { useHabits } from '@/hooks/useHabits';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleHabitToday,
    getStreak,
    getLast7DaysStatus,
    isCompletedToday,
    getWeeklyCompletionRate,
  } = useHabits();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto px-4 pb-8">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        
        <div className="space-y-6">
          <StatsCard 
            completionRate={getWeeklyCompletionRate()} 
            totalHabits={habits.length} 
          />
          
          <AddHabitForm onAdd={addHabit} />
          
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {habits.length === 0 ? (
                <EmptyState />
              ) : (
                habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    streak={getStreak(habit)}
                    last7Days={getLast7DaysStatus(habit)}
                    isCompletedToday={isCompletedToday(habit)}
                    onToggle={() => toggleHabitToday(habit.id)}
                    onDelete={() => deleteHabit(habit.id)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
