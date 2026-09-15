import { formatDate, getDueStatus } from '../utils/taskUtils';

const STATUS_LABEL = {
  overdue: 'Overdue',
  'due-today': 'Due today',
  upcoming: 'Upcoming',
  none: '',
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const dueStatus = getDueStatus(task);

  return (
    <li className={`task-item priority-${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="checkmark" aria-hidden="true" />
      </label>

      <div className="task-content">
        <div className="task-title-row">
          <span className="task-title">{task.title}</span>
          <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>

        {task.description && <p className="task-desc">{task.description}</p>}

        <div className="task-meta">
          <span className="badge badge-category">{task.category}</span>
          {task.dueDate ? (
            <span className={`badge badge-due-${dueStatus}`}>
              {STATUS_LABEL[dueStatus]} · {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="badge badge-due-none">No due date</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button type="button" className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit "${task.title}"`}>
          Edit
        </button>
        <button
          type="button"
          className="icon-btn icon-btn-danger"
          onClick={() => onDelete(task)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
