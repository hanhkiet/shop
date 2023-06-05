import { useRef, useState } from 'react';

export const useRefWithValidator = (
  check: RegExp | Function,
  errorMessage: string,
) => {
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const value = ref.current?.value;

    if (value && (check instanceof RegExp ? check.test(value) : check(value))) {
      setError('');
      return true;
    } else {
      setError(errorMessage);
      return false;
    }
  };

  return { ref, error, validate };
};
