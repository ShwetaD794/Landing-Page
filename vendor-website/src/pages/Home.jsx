import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { products, addToCart, user, addSubmission } = useAuth();
  const [text, setText] = useState("");
  const [addedStatus, setAddedStatus] = useState({}); // for tracking which products were added

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedStatus((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
    }, 1500); // reset after 1.5 seconds
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    addSubmission({ user: user.username, text });
    setText("");
    alert("Submission successful!");
  };

  return (
    <div className="container">
      <h1 className="heading">Welcome to New World</h1>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h2 className="card-title">{p.name}</h2>
            <p>{p.description}</p>
            <p className="price">₹{p.price}</p>
            {user?.role === "user" ? (
              <button className="btn" onClick={() => handleAddToCart(p)}>
                {addedStatus[p.id] ? "Added!" : "Add to Cart"}
              </button>
            ) : (
              <button className="btn" disabled style={{ opacity: 0.5 }}>
                User Only
              </button>
            )}
          </div>
        ))}
      </div>

      {user?.role === "user" ? (
        <div className="submission-form">
          <h3>Submit Something</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : user ? (
        <p style={{ marginTop: "2rem", color: "gray" }}>
          🔒 Only users can submit something.
        </p>
      ) : (
        <p style={{ marginTop: "2rem", color: "gray" }}>
          🔒 Please <a href="/login">login</a> to submit something.
        </p>
      )}
    </div>
  );
}
