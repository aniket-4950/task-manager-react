import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card" style={{ maxWidth: 480, margin: "2rem auto" }}>
      <h2>404 - Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/tasks">
        <button className="btn btn-primary">Go to Tasks</button>
      </Link>
    </div>
  );
}
