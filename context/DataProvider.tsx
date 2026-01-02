'use client';
import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import cartReducer from '../utils/cartReducer';

const STORAGE_KEY = 'data';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext)!;

const SetDataContext = createContext(null);
export const useSetData = () => useContext(SetDataContext)!;

export default function DataProvider({ dat, children }) {
  const [data, setData] = useState(dat);
  const isFirst = useRef(true);

  useEffect(() => {
    const storedValue = localStorage?.getItem(STORAGE_KEY);
    if (storedValue && storedValue.length) setData(JSON.parse(storedValue));
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <SetDataContext.Provider value={setData}>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </SetDataContext.Provider>
  );
}
