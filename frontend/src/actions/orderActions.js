import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo }, // Get the token from the user info in state (Wait! we need to add userLogin to store later if we haven't. For now we assume userInfo is in localStorage, but properly it should be in Redux. Let's use the token from localStorage directly for safety if Redux isn't set up for auth yet.)
    } = getState(); 
    // Correction: In Story 1.2 we used localStorage but didn't setup Redux for User Login. 
    // So we will grab the token directly from localStorage here to keep it simple.
    
    const userInfoLocal = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoLocal.token}`,
      },
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(order),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.message,
    });
  }
};
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await fetch('/api/orders/myorders', {
      method: 'GET',
      headers: config.headers,
    });
    
    const data = await res.json();

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.message,
    });
  }
};