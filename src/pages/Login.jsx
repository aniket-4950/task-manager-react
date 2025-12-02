import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const ok = await login(data.email, data.password);
    if (!ok) {
      setError("root", { message: "Invalid email or password" });
    } else {
      navigate("/tasks");
    }
  };

  if (isAuthenticated) {
    navigate("/tasks");
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="input"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="form-error">{errors.root.message}</p>
        )}

        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ fontSize: "0.8rem", marginTop: "0.75rem", color: "#6b7280" }}>
        Use any valid email & password (mock authentication).
      </p>
    </div>
  );
}
