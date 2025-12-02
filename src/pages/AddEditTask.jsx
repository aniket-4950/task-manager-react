import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import { useMemo } from "react";

export default function AddEditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, editTask } = useTasks();

  const editing = !!id;
  const task = useMemo(
    () => tasks.find((t) => t.id === Number(id)),
    [id, tasks]
  );

  const isCompleted = task?.completed || task?.status === "Completed";

  const initialValues = task || {
    title: "",
    description: "",
    status: "Pending",
    dueDate: new Date().toISOString().split("T")[0],
  };

  const handleSubmit = async (values) => {
    if (editing) {
      await editTask(id, values);
    } else {
      await addTask(values);
    }
    navigate("/tasks");
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0 }}>{editing ? "Edit Task" : "Add New Task"}</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/tasks")}
        >
          Back
        </button>
      </div>

      {editing && !task && (
        <p className="form-error">Task not found. It may have been removed.</p>
      )}

      <TaskForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isDisabled={!!(editing && isCompleted)}
      />
    </div>
  );
}
