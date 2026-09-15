import { PRIORITIES } from '../utils/taskUtils';

const STATUSES = ['All', 'Pending', 'Completed', 'Overdue'];
const SORTS = [
  { value: 'Newest', label: 'Newest' },
  { value: 'Oldest', label: 'Oldest' },
  { value: 'DueDate', label: 'Due date' },
  { value: 'Priority', label: 'Priority' },
  { value: 'Title', label: 'Title' },
];

export default function Toolbar({ filters, onFilterChange, categories }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="search-input"
        placeholder="Search title or description..."
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        aria-label="Search tasks"
      />

      <div className="toolbar-filters">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          aria-label="Filter by status"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ priority: e.target.value })}
          aria-label="Filter by priority"
        >
          <option value="All">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          aria-label="Sort tasks"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
