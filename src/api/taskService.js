import axios from "axios";
import { DEFAULT_STATUSES } from "../utils/constants";

let tasksCache = [];
let nextId = 10000;

function randomStatus() {
  const idx = Math.floor(Math.random() * DEFAULT_STATUSES.length);
  return DEFAULT_STATUSES[idx];
}

function randomFutureDate() {
  const now = Date.now();
  const daysAhead = Math.floor(Math.random() * 20) + 1;
  const future = new Date(now + daysAhead * 24 * 60 * 60 * 1000);
  return future.toISOString().split("T")[0];
}

export async function getTasks() {
  if (tasksCache.length) return tasksCache;

  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  const enriched = res.data.slice(0, 30).map((t) => ({
    id: t.id,
    title: t.title,
    description: "This is a dummy description for demonstration purposes.",
    status: t.completed ? "Completed" : randomStatus(),
    dueDate: randomFutureDate(),
    completed: t.completed,
  }));
  tasksCache = enriched;
  nextId = Math.max(...tasksCache.map((t) => t.id)) + 1;
  return tasksCache;
}

export async function createTask(taskData) {
  const newTask = {
    id: nextId++,
    title: taskData.title,
    description: taskData.description || "No description provided.",
    status: taskData.status,
    dueDate: taskData.dueDate,
    completed: taskData.status === "Completed",
  };
  tasksCache.push(newTask);
  return newTask;
}

export async function updateTask(id, updates) {
  const idx = tasksCache.findIndex((t) => t.id === Number(id));
  if (idx === -1) throw new Error("Task not found");

  const existing = tasksCache[idx];
  if (existing.completed) {
    // not editable once completed
    return existing;
  }

  const updated = {
    ...existing,
    ...updates,
    completed: updates.status === "Completed" || existing.completed,
  };
  tasksCache[idx] = updated;
  return updated;
}

export async function markTaskCompleted(id) {
  const idx = tasksCache.findIndex((t) => t.id === Number(id));
  if (idx === -1) throw new Error("Task not found");

  const updated = {
    ...tasksCache[idx],
    status: "Completed",
    completed: true,
  };
  tasksCache[idx] = updated;
  return updated;
}
