import { DEFAULT_STATUSES } from "../utils/constants";

export default function TaskFilters({
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <div className="filters-row">
      <select
        className="select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        {DEFAULT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        className="select"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="dueDateAsc">Due Date ↑</option>
        <option value="dueDateDesc">Due Date ↓</option>
      </select>
    </div>
  );
}
