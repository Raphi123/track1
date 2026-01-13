import { useState, useEffect } from 'react';

export interface HabitDay {
  date: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  history: HabitDay[];
}

const STORAGE_KEY = 'habit-tracker-data';

const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

const getLast7Days = (): string[] => {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(getDateString(date));
  }
  return days;
};

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse habits from localStorage');
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    if (!name.trim()) return;
    
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: getDateString(),
      history: [],
    };
    
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabitToday = (id: string) => {
    const today = getDateString();
    
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit;
      
      const existingIndex = habit.history.findIndex(h => h.date === today);
      
      if (existingIndex >= 0) {
        // Toggle existing entry
        const newHistory = [...habit.history];
        newHistory[existingIndex] = {
          ...newHistory[existingIndex],
          completed: !newHistory[existingIndex].completed,
        };
        return { ...habit, history: newHistory };
      } else {
        // Add new entry
        return {
          ...habit,
          history: [...habit.history, { date: today, completed: true }],
        };
      }
    }));
  };

  const getStreak = (habit: Habit): number => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i <= 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const dayEntry = habit.history.find(h => h.date === dateStr);
      
      if (dayEntry?.completed) {
        streak++;
      } else if (i > 0) {
        // Don't break on today if not completed yet
        break;
      }
    }
    
    return streak;
  };

  const getLast7DaysStatus = (habit: Habit): boolean[] => {
    const last7 = getLast7Days();
    return last7.map(date => {
      const entry = habit.history.find(h => h.date === date);
      return entry?.completed || false;
    });
  };

  const isCompletedToday = (habit: Habit): boolean => {
    const today = getDateString();
    const entry = habit.history.find(h => h.date === today);
    return entry?.completed || false;
  };

  const getWeeklyCompletionRate = (): number => {
    if (habits.length === 0) return 0;
    
    const last7 = getLast7Days();
    let totalPossible = habits.length * 7;
    let totalCompleted = 0;
    
    habits.forEach(habit => {
      last7.forEach(date => {
        const entry = habit.history.find(h => h.date === date);
        if (entry?.completed) totalCompleted++;
      });
    });
    
    return Math.round((totalCompleted / totalPossible) * 100);
  };

  return {
    habits,
    addHabit,
    deleteHabit,
    toggleHabitToday,
    getStreak,
    getLast7DaysStatus,
    isCompletedToday,
    getWeeklyCompletionRate,
  };
};
