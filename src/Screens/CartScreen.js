import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // eslint-disable-next-line
  }, []);
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div className="price">Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div className="cart-empty"> Cart is empty</div>
          ) : (
            cartItems.map((item) => {
              return (
                <li key={item.productId}>
                  <div className="cart-image">
                    <img src={item.image} alt={item.image} />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.productId}>{item.name}</Link>
                    </div>
                    <div>
                      Qty:
                      <select
                        className="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(addToCart(item.productId, e.target.value));
                        }}
                      >
                        {[...Array(item.countStok).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.id)}
                        className="button del-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-price">${item.price}</div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkOutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
