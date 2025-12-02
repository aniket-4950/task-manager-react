import { createContext, useContext, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  markTaskCompleted,
} from "../api/taskService";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const completeTask = async (id) => {
    const updated = await markTaskCompleted(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const value = {
    tasks,
    loading,
    error,
    reload: loadTasks,
    addTask,
    editTask,
    completeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
