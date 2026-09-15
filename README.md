# To-Do List

A React + Vite to-do app with task CRUD, search, filters, sorting, overdue tracking, and a dashboard. Data persists in `localStorage`.

## Features

- Create, edit, delete tasks (title, description, priority, category, due date)
- Mark tasks complete/incomplete
- Search by title and description
- Filter by status (All/Pending/Completed/Overdue), priority, and category
- Sort by newest, oldest, due date, priority, or title
- Overdue / due-today / upcoming due-date logic
- Dashboard with total, pending, completed, overdue, and due-today counts
- Responsive UI with validation and delete confirmation

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
  components/   Reusable UI components (form, list, dashboard, toolbar, modal)
  pages/        TasksPage (main view)
  hooks/        useTasks (state + localStorage persistence)
  utils/        Filtering, sorting, and due-date helpers
```

## License

MIT — see [LICENSE](./LICENSE).
