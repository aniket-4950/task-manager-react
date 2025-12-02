import * as yup from "yup";
import { DEFAULT_STATUSES } from "./constants";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4).required("Password is required"),
});

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(DEFAULT_STATUSES, "Invalid status")
    .required("Status is required"),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test("not-past", "Due date cannot be in the past", (value) => {
      if (!value) return false;
      const today = new Date();
      const date = new Date(value);
      return date >= new Date(today.toDateString());
    }),
});
