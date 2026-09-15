export default function Dashboard({ stats }) {
  const items = [
    { label: 'Total', value: stats.total },
    { label: 'Pending', value: stats.pending },
    { label: 'Completed', value: stats.completed },
    { label: 'Overdue', value: stats.overdue, tone: 'danger' },
    { label: 'Due today', value: stats.dueToday, tone: 'warn' },
  ];

  return (
    <div className="dashboard">
      {items.map((item) => (
        <div key={item.label} className={`stat-card ${item.tone ? `stat-${item.tone}` : ''}`}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
