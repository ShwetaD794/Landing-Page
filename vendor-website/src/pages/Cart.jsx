import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, clearCart, user } = useAuth();

  if (!user || user.role !== "user") {
    return <p className="container">Only users can view the cart.</p>;
  }

  return (
    <div className="container">
      <h2 className="heading">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
          <button className="form-btn" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
