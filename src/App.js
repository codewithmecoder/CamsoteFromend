import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SigninScreen";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className="burger" onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">Camstòr</Link>
          </div>
          <div className="header-links">
            {/* <a href="cart.html">Carts</a> */}
            <Link to="/cart">Carts</Link>
            <Link to="/signin">Sign in</Link>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-closeBtn" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">T-Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All Right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
