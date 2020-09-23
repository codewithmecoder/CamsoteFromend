import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constains/cartContants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countStok: data.countStok,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
  console.log(cartItems);
};
export { addToCart, removeFromCart };
