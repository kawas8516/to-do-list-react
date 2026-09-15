import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { filterTasks, sortTasks, isOverdue, isDueToday } from '../utils/taskUtils';
import Dashboard from '../components/Dashboard';
import Toolbar from '../components/Toolbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ConfirmDialog from '../components/ConfirmDialog';

const DEFAULT_FILTERS = { search: '', status: 'All', priority: 'All', category: 'All', sortBy: 'Newest' };

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [formState, setFormState] = useState(null); // null | 'new' | task
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(tasks.map((t) => t.category).filter(Boolean));
    return Array.from(set).sort();
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(isOverdue).length;
    const dueToday = tasks.filter(isDueToday).length;
    return { total, completed, pending, overdue, dueToday };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, filters.sortBy);
  }, [tasks, filters]);

  function handleFilterChange(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleFormSubmit(values) {
    if (formState === 'new') {
      addTask(values);
    } else if (formState) {
      updateTask(formState.id, values);
    }
    setFormState(null);
  }

  function handleConfirmDelete() {
    if (deleteTarget) {
      deleteTask(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>My Tasks</h1>
        <button type="button" className="btn btn-primary" onClick={() => setFormState('new')}>
          + New Task
        </button>
      </header>

      <Dashboard stats={stats} />

      <Toolbar filters={filters} onFilterChange={handleFilterChange} categories={categories} />

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleComplete}
        onEdit={(task) => setFormState(task)}
        onDelete={(task) => setDeleteTarget(task)}
      />

      {formState && (
        <TaskForm
          initialTask={formState === 'new' ? null : formState}
          categories={categories}
          onSubmit={handleFormSubmit}
          onClose={() => setFormState(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
