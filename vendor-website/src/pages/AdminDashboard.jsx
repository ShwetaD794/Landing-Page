import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user, products, addProduct, deleteProduct, submissions } = useAuth();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    // Wait for user to be set
    const timeout = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  if (!user || user.role !== "admin") {
    return <p className="container">Access denied. Only admins can view this page.</p>;
  }

  const handleAdd = () => {
    addProduct(form);
    setForm({ name: "", description: "", price: "" });
  };

  return (
    <div className="container">
      <h2 className="heading">Admin Dashboard</h2>
      <div className="admin-form">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <button className="admin-btn" onClick={handleAdd}>Add Product</button>
      </div>

      <div className="admin-list">
        {products.map(p => (
          <div key={p.id} className="admin-item">
            <span>{p.name} - ₹{p.price}</span>
            <button onClick={() => deleteProduct(p.id)} className="logout">Delete</button>
          </div>
        ))}
      </div>

      <div className="submissions-list">
        <h3>User Submissions</h3>
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          submissions.map((s, idx) => (
            <div key={idx} className="submission-item">
              <strong>{s.user}:</strong> {s.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
