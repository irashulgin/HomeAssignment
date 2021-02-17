import { ADD_TO_CART, REMOVE_FROM_CART, SET_RANK } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  let cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x !== null & x.id === product.id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1, active: true });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.id !== product.id);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCartAll = (product) => (dispatch, getState) => {
  const r = window.confirm("Do you really want to remove all?");
  if (r === true) {
    const cartItems = [];
    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

export const setRank = (product) => (dispatch, getState) => {
  let cartItems = getState().cart.cartItems.slice();
  dispatch({
    type: SET_RANK,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
