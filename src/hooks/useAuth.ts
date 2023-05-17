import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginSuccess, logoutSuccess } from '../app/authSlice';
import { RootState } from '../app/store';
import { User } from '../app/types';
import { api_url } from '../utils/url';
import useLocalStorage from './useLocalStorage';

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage('accessToken', null);

  const loginHandler = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${api_url}/auth/login`, {
        email,
        password,
      });

      const user = response.data.userData as User;
      if (!user) {
        throw new Error('Login failed');
      }

      const token = response.data.jwt;
      setToken(token);

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
      const response = await axios.post(`${api_url}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      const user = response.data.userData as User;
      if (!user) {
        throw new Error('Register failed');
      }

      const token = response.data.jwt;
      setToken(token);

      dispatch(loginSuccess(user));
      return response.data;
    } catch (error) {
      dispatch(loginFailed('Register failed'));
      throw error;
    }
  };

  const logoutHandler = () => {
    axios
      .post(
        `${api_url}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        setToken(null);
        dispatch(logoutSuccess());
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    isAuthenticated,
    user,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
};
