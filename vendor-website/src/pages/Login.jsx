import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setLoading(true);
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (loading && user && !redirected) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // ✅ HOME PAGE for users
      }
      setRedirected(true);
    }
  }, [loading, user, navigate, redirected]);

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="form-btn" type="submit">
          Login
        </button>
      </form>
      {loading && <p>Redirecting...</p>}
    </div>
  );
}
