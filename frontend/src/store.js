import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer } from './reducers/orderReducers';
import { userLoginReducer } from './reducers/userReducers'; // <--- NEW IMPORT

// 1. COMBINE REDUCERS
const reducer = combineReducers({
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  userLogin: userLoginReducer, // <--- NEW: Add user login logic
});

// 2. LOAD INITIAL STATE
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// NEW: Load user info so we stay logged in
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// 3. DEFINE INITIAL STATE
const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage, 
  },
  userLogin: { userInfo: userInfoFromStorage }, // <--- NEW
};

// 4. DEFINE MIDDLEWARE
const middleware = [thunk];

// 5. CREATE STORE
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;