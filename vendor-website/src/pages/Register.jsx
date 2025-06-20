import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(username, password, role);
    if (success) {
      alert(`Account created as ${role}. Please login.`);
      navigate("/login");
    } else {
      alert("Username already exists");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select className="input" value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="form-btn" type="submit">Register</button>
      </form>
    </div>
  );
}
