import { useRef, useState } from 'react';

export const useRefWithValidator = (regex: RegExp, errorMessage: string) => {
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const validate = () => {
    const value = ref.current?.value;
    if (value && regex.test(value)) {
      setError('');
    } else {
      setError(errorMessage);
    }
  };

  return { ref, error, validate };
};
