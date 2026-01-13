import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

export const AddHabitForm = ({ onAdd }: AddHabitFormProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new habit..."
        className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    </form>
  );
};
