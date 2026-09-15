import { useEffect, useState } from 'react';
import { genId } from '../utils/taskUtils';

const STORAGE_KEY = 'todo-tasks';

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(data) {
    const task = {
      id: genId(),
      title: data.title.trim(),
      description: data.description?.trim() || '',
      priority: data.priority || 'Medium',
      category: data.category?.trim() || 'General',
      dueDate: data.dueDate || '',
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
  }

  function updateTask(id, data) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: data.title.trim(),
              description: data.description?.trim() || '',
              priority: data.priority || 'Medium',
              category: data.category?.trim() || 'General',
              dueDate: data.dueDate || '',
            }
          : t
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
}
