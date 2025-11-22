import axios from 'axios'; // We need to install axios or use fetch. Let's use axios for cleaner code, or stick to fetch.
// To avoid installing new packages right now, let's stick to fetch since we used it everywhere else.

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json();

  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // Save to LocalStorage so we don't lose the cart on refresh
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};