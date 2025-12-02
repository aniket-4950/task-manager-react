import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import TaskFilters from "../components/TaskFilters";
import Loader from "../components/Loader";

export default function TaskList() {
  const { tasks, loading, error, completeTask } = useTasks();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("dueDateAsc");
  const navigate = useNavigate();

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    filtered = [...filtered].sort((a, b) => {
      const d1 = new Date(a.dueDate);
      const d2 = new Date(b.dueDate);
      if (sortBy === "dueDateAsc") return d1 - d2;
      return d2 - d1;
    });

    return filtered;
  }, [tasks, search, statusFilter, sortBy]);

  const handleComplete = async (id) => {
    await completeTask(id);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Tasks</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/tasks/new")}
        >
          + Add Task
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="filters-row">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by task title"
        />
      </div>

      <TaskFilters
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {filteredTasks.length === 0 && (
        <div className="card empty-state">
          No tasks found. Try changing filters or add a new task.
        </div>
      )}

      {filteredTasks.length > 0 && (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
