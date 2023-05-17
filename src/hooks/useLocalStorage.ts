import { useState } from 'react';

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T | null, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('Error retrieving item from local storage: ', error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue as T) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('Error setting item to local storage: ', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
