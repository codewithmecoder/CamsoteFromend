import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constains/cartContants";

function cartReducers(state = { cartItems: [] }, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x._id === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
}

export { cartReducers };
