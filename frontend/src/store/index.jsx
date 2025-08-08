import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  cart: {
    items: [],
    totalItems: 0
  },
  auth: {
    isLoggedIn: false,
    user: null
  }
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.cart.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalItems: state.cart.totalItems + 1
          }
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, { ...action.payload, quantity: 1 }],
            totalItems: state.cart.totalItems + 1
          }
        };
      }

    case CART_ACTIONS.REMOVE_ITEM:
      const itemToRemove = state.cart.items.find(item => item.id === action.payload);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(item => item.id !== action.payload),
          totalItems: state.cart.totalItems - (itemToRemove?.quantity || 0)
        }
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
          totalItems: state.cart.items.reduce((total, item) => {
            if (item.id === action.payload.id) {
              return total + action.payload.quantity;
            }
            return total + item.quantity;
          }, 0)
        }
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: {
          items: [],
          totalItems: 0
        }
      };

    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        auth: {
          isLoggedIn: true,
          user: action.payload
        }
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        auth: {
          isLoggedIn: false,
          user: null
        }
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: { ...state.auth.user, ...action.payload }
        }
      };

    default:
      return state;
  }
};

// Create context
const StoreContext = createContext();

// Provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Auth actions
  const login = (userData) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const updateUser = (userData) => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: userData });
  };

  const value = {
    state,
    cart: {
      items: state.cart.items,
      totalItems: state.cart.totalItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart
    },
    auth: {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
      login,
      logout,
      updateUser
    }
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hooks
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const useCart = () => {
  const { cart } = useStore();
  return cart;
};

export const useAuth = () => {
  const { auth } = useStore();
  return auth;
}; 