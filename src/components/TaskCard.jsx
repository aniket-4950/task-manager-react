import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task, onComplete }) {
  const isCompleted = task.completed || task.status === "Completed";

  return (
    <div className="card">

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1e293b" }}>
          {task.title}
        </h3>
        <StatusBadge status={task.status} />
      </div>

      <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: 14 }}>
        {task.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
          <strong>Due:</strong> {task.dueDate}
        </span>

        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: isCompleted ? "#16a34a" : "#dc2626",
          }}
        >
          {isCompleted ? "Completed" : "Not Completed"}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          className="btn btn-primary fixed-btn"
          disabled={isCompleted}
          onClick={() => onComplete(task.id)}
        >
          Mark Completed
        </button>

        <Link to={`/tasks/${task.id}/edit`} style={{ width: "100%" }}>
          <button
            className="btn btn-secondary fixed-btn"
            disabled={isCompleted}
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
