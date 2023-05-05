import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface AxiosType<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export const useAxios = <T>(
  initialUrl: string,
  initialData: T | null = null,
) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState<T | null>(initialData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<T> = await axios(url);
        setData(response.data);
        setErrorMessage('');
      } catch (err) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, errorMessage, isLoading, setUrl };
};
