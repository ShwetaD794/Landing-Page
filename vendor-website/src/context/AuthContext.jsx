import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("products")) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [submissions, setSubmissions] = useState(() => JSON.parse(localStorage.getItem("submissions")) || []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [user, users, products, cart, submissions]);

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (username, password, role = "user") => {
    if (users.find(u => u.username === username)) return false;
    const newUser = { username, password, role };
    setUsers([...users, newUser]);
    return true;
  };

  const logout = () => setUser(null);
  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);
  const addSubmission = (submission) => setSubmissions([...submissions, submission]);

  return (
    <AuthContext.Provider value={{
      user, login, register, logout,
      products, addProduct, deleteProduct,
      cart, addToCart, clearCart,
      submissions, addSubmission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
