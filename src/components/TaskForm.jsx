import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../utils/validationSchemas";
import { DEFAULT_STATUSES } from "../utils/constants";

export default function TaskForm({ initialValues, onSubmit, isDisabled }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="input"
          disabled={isDisabled}
          {...register("title")}
          placeholder="Task title"
        />
        {errors.title && (
          <p className="form-error">{errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="textarea"
          rows={3}
          disabled={isDisabled}
          {...register("description")}
          placeholder="Describe the task"
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Status</label>
        <select
          className="select"
          disabled={isDisabled}
          {...register("status")}
        >
          <option value="">Select status</option>
          {DEFAULT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="form-error">{errors.status.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="input"
          disabled={isDisabled}
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p className="form-error">{errors.dueDate.message}</p>
        )}
      </div>

      {!isDisabled && (
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
      )}
      {isDisabled && (
        <p className="form-error">
          This task is completed and can no longer be edited.
        </p>
      )}
    </form>
  );
}
