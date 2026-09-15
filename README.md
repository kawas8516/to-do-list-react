# To-Do List

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

A React + Vite to-do app with task CRUD, search, filters, sorting, overdue tracking, and a dashboard. Data persists in `localStorage`.

Repo: https://github.com/kawas8516/to-do-list-react

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
git clone https://github.com/kawas8516/to-do-list-react.git
cd to-do-list-react
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
