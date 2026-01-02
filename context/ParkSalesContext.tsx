'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSetCart } from './CartContext';

const STORAGE_KEY = 'parkSales';

const ParkSalesContext = createContext(null);
export const useParkSales = () => useContext(ParkSalesContext)!;

const SetParkSalesContext = createContext(null);
export const useSetParkSales = () => useContext(SetParkSalesContext)!;

export default function ParkSalesProvider({ children }) {
  const [parkedSales, setParkedSales] = useState([]);
  const dispatchCart = useSetCart();
  const isFirst = useRef(true);

  const parkSale = sale => {
    setParkedSales(st => [sale, ...st]);
  };
  const retrieveSale = saleId => {
    let removedSale;

    const newArr = parkedSales.filter(item => {
      if (item.id === saleId) {
        removedSale = item;
        return false;
      }
      return true;
    });
    dispatchCart({ type: 'set-cart', payload: removedSale.cartItems });
    setParkedSales(newArr);
  };
  const cancelSale = saleId => {
    setParkedSales(st => st.filter(item => item.id !== saleId));
  };

  useEffect(() => {
    const storedValue = localStorage?.getItem(STORAGE_KEY);
    if (storedValue && storedValue.length) setParkedSales(JSON.parse(storedValue));
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parkedSales));
  }, [parkedSales]);

  return (
    <SetParkSalesContext.Provider value={{ parkSale, retrieveSale, cancelSale }}>
      <ParkSalesContext.Provider value={parkedSales}>{children}</ParkSalesContext.Provider>
    </SetParkSalesContext.Provider>
  );
}
