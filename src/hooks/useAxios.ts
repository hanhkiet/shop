import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

interface AxiosProps<T> {
  baseUrl: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

const useAxios = <T>({
  baseUrl,
  method,
  data,
  headers,
  onSuccess,
  onError,
}: AxiosProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<T | null>(null);
  const [token, _] = useLocalStorage('accessToken');

  const execute = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        baseURL: baseUrl,
        method,
        data,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse(response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      setError(error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, response, execute };
};

export default useAxios;
