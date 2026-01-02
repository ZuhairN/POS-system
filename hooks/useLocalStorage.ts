import { useState, useEffect } from 'react';

export function useLocalStorageState(key, initVal) {
  const [value, setValue] = useState(initVal);

  useEffect(() => {
    const storedValue = localStorage?.getItem(key);
    if (storedValue) setValue(JSON.parse(storedValue));
  }, [key]);

  return [value, setValue];
}
