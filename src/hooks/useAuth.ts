import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginSuccess, logoutSuccess } from '../app/AuthSlice';
import { RootState } from '../app/store';
import { api_url } from '../utils/url';
import useLocalStorage from './useLocalStorage';

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage('accessToken', null);

  const loginHandler = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${api_url}/auth/authenticate`, {
        email,
        password,
      });

      const user = response.data;
      if (!user) {
        throw new Error('Login failed');
      }

      setToken(user.token);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailed('Login failed'));
      throw error;
    }
  };

  const registerHandler = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await axios.post(
        `${api_url}/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const uuid = response.data.uuid;
      if (!uuid) {
        throw new Error(response.data.message || 'Register failed');
      }

      const user = {
        uuid: response.data.uuid,
        email,
        name: `${firstName} ${lastName}`,
      };

      const token = response.data.token;
      setToken(token);
      console.log(token);

      dispatch(loginSuccess(user));
      return response.data;
    } catch (error) {
      dispatch(loginFailed('Register failed'));
      throw error;
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${api_url}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setToken(null);
      dispatch(logoutSuccess());
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  return {
    isAuthenticated,
    user,
    error,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
};
