import { useState } from 'react';

const useSessionStorage = <T>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  const updateValue = (newValue: T) => {
    sessionStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return { value, updateValue };
};

const clearSessionStorage = () => {
  sessionStorage.clear();
};

export { clearSessionStorage, useSessionStorage };
