'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: {
    giftBag?: boolean;
    giftBox?: boolean;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  step: 'cart' | 'shipping' | 'payment';
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_OPTIONS'; payload: { id: string; options: CartItem['selectedOptions'] } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_STEP'; payload: { step: CartState['step'] } };

const initialState: CartState = {
  items: [],
  isOpen: false,
  step: 'cart'
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, {
          id: `${action.payload.product.id}-${Date.now()}`,
          product: action.payload.product,
          quantity: action.payload.quantity || 1,
          selectedOptions: {}
        }]
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'UPDATE_OPTIONS':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, selectedOptions: { ...item.selectedOptions, ...action.payload.options } }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'SET_STEP':
      return {
        ...state,
        step: action.payload.step
      };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateOptions: (id: string, options: CartItem['selectedOptions']) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setStep: (step: CartState['step']) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateOptions = (id: string, options: CartItem['selectedOptions']) => {
    dispatch({ type: 'UPDATE_OPTIONS', payload: { id, options } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setStep = (step: CartState['step']) => {
    dispatch({ type: 'SET_STEP', payload: { step } });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      let itemTotal = item.product.price * item.quantity;
      
      // Add gift options pricing
      if (item.selectedOptions?.giftBag) itemTotal += 59; // CZK
      if (item.selectedOptions?.giftBox) itemTotal += 990; // CZK
      
      return total + itemTotal;
    }, 0);
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    updateOptions,
    clearCart,
    toggleCart,
    setStep,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
