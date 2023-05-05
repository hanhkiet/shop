import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginSuccess, logoutSuccess } from '../slices/AuthSlice';
import { RootState } from '../store';
import { api_url } from '../utils/url';

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();

  const loginHandler = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${api_url}/auth/authenticate`, {
        email,
        password,
      });

      var user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailed('Login failed'));
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

      const user = {
        uuid: response.data.uuid,
        email,
        name: response.data.firstName + ' ' + response.data.lastName,
      };

      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailed('Register failed'));
      throw error;
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post(`${api_url}/auth/logout`);
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(loginFailed('Logout failed'));
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
