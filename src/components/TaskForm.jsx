import { useState } from 'react';
import { PRIORITIES } from '../utils/taskUtils';
import Modal from './Modal';

const EMPTY = { title: '', description: '', priority: 'Medium', category: '', dueDate: '' };

export default function TaskForm({ initialTask, categories, onSubmit, onClose }) {
  const [values, setValues] = useState(() =>
    initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description,
          priority: initialTask.priority,
          category: initialTask.category,
          dueDate: initialTask.dueDate,
        }
      : EMPTY
  );
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!values.title.trim()) next.title = 'Title is required.';
    else if (values.title.trim().length > 100) next.title = 'Title must be under 100 characters.';
    if (values.description.length > 500) next.description = 'Description must be under 500 characters.';
    if (!values.category.trim()) next.category = 'Category is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  }

  return (
    <Modal title={initialTask ? 'Edit Task' : 'New Task'} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body">
          <div className="field">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={values.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={errors.title ? 'input-error' : ''}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              autoFocus
            />
            {errors.title && <p className="error-text" id="title-error">{errors.title}</p>}
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className={errors.description ? 'input-error' : ''}
              aria-invalid={!!errors.description}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={values.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="date"
                value={values.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="category">Category *</label>
            <input
              id="category"
              type="text"
              list="category-options"
              value={values.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={errors.category ? 'input-error' : ''}
              aria-invalid={!!errors.category}
              placeholder="e.g. Work, Personal"
            />
            <datalist id="category-options">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialTask ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
