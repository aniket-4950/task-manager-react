export default function StatusBadge({ status }) {
  const key = status.toLowerCase().replace(" ", "-");

  return (
    <span className={`status-badge status-${key}`}>
      {status}
    </span>
  );
}
