export const PRIORITIES = ['Low', 'Medium', 'High'];

export function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Returns 'overdue' | 'due-today' | 'upcoming' | 'none'
export function getDueStatus(task) {
  if (!task.dueDate) return 'none';
  if (task.completed) return 'none';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);

  if (due.getTime() < today.getTime()) return 'overdue';
  if (due.getTime() === today.getTime()) return 'due-today';
  return 'upcoming';
}

export function isOverdue(task) {
  return getDueStatus(task) === 'overdue';
}

export function isDueToday(task) {
  return getDueStatus(task) === 'due-today';
}

export function filterTasks(tasks, { search, status, priority, category }) {
  return tasks.filter((task) => {
    if (search) {
      const q = search.trim().toLowerCase();
      const inTitle = task.title.toLowerCase().includes(q);
      const inDesc = (task.description || '').toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }

    if (status && status !== 'All') {
      if (status === 'Pending' && task.completed) return false;
      if (status === 'Completed' && !task.completed) return false;
      if (status === 'Overdue' && !isOverdue(task)) return false;
    }

    if (priority && priority !== 'All' && task.priority !== priority) return false;

    if (category && category !== 'All' && task.category !== category) return false;

    return true;
  });
}

const PRIORITY_WEIGHT = { High: 3, Medium: 2, Low: 1 };

export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'Oldest':
      sorted.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case 'DueDate':
      sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
    case 'Priority':
      sorted.sort((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]);
      break;
    case 'Title':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'Newest':
    default:
      sorted.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return sorted;
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
