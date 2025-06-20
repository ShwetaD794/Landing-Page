import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="heading">New World</Link>
      <div>
        <Link to="/">Home</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.role === "user" && <Link to="/cart">Cart</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <span onClick={logout} className="logout">Logout</span>
        )}
      </div>
    </nav>
  );
}
