import { useRef, useState } from 'react';

export const useRefWithValidator = (regex: RegExp, errorMessage: string) => {
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const value = ref.current?.value;
    if (value && regex.test(value)) {
      setError('');
      return true;
    } else {
      setError(errorMessage);
      return false;
    }
  };

  return { ref, error, validate };
};
