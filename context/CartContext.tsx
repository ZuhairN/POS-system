'use client';
import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import cartReducer from '../utils/cartReducer';

const STORAGE_KEY = 'cartItem';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext)!;

const SetCartContext = createContext(null);
export const useSetCart = () => useContext(SetCartContext)!;

export default function CartProvider({ children }) {
  const [data, dispatch] = useReducer(cartReducer, []);
  const isFirst = useRef(true);

  useEffect(() => {
    const storedValue = localStorage?.getItem(STORAGE_KEY);
    if (storedValue && storedValue.length) dispatch({ type: 'set-cart', payload: JSON.parse(storedValue) });
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <SetCartContext.Provider value={dispatch}>
      <CartContext.Provider value={data}>{children}</CartContext.Provider>
    </SetCartContext.Provider>
  );
}
