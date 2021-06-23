import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../lib/axios';
import { verify, JWT_SECRET } from '../utils/jwt';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    console.log('token--------------');
    console.log(accessToken);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user
    };
  },
  PASSWORDRECOVERY: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  PASSWORDTOKENVALID: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  PASSWORDRESET: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

const AuthContext = createContext({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordTokenValid: () => Promise.resolve(),
  passwordReset: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && verify(accessToken, JWT_SECRET)) {
          setSession(accessToken);

          const response = await axios.get('/api/identity/me');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/authenticate', {
      email,
      password
    });
    // const { accessToken, user } = response.data;
    console.log('token ..........................');
    const user = response.data;
    const accessToken = response.data.token;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  /* --------- PASSWORD RECOVERY ND--------- */
  const passwordRecovery = async (email) => {
    const response = await axios.post('/api/user/forgotPassword', {}, { params: { email } });
    if (response.status === 200) {
      console.log('passwordRecovery success.-------------------');
    }
    dispatch({ type: 'PASSWORDRECOVERY' });
  };
  /* ---------------------- PASSWORD TOKEN VALID ND-----------------------*/
  const passwordTokenValid = (callbackPasswordTokenValid, token) => {
    axios.get('/api/user/validatePasswordResetToken', { params: { token } })
      .then((response) => {
        callbackPasswordTokenValid(response);
        console.log('PASSWORD TOKEN  IS VALID FROM AXIOS-------');
      }, (error) => {
        console.log('PASSWORD TOKEN  IS INVALID-------');
        console.log(error);
      });
    dispatch({ type: 'PASSWORDTOKENVALID' });
  };
  /* ---------------------- PASSWORD RESET ND-----------------------*/
  const passwordReset = async (token, password) => {
    const response = await axios.post('/api/user/resetPassword', {}, { params: { token, password } });
    if (response.status === 200) {
      console.log('passwordReset success.-------------------');
    }
    dispatch({ type: 'PASSWORDRESET' });
  };
  /*---------------------------------------------------------*/
  const register = async (firstName, lastName, email, password, roles) => {
    const response = await axios.post('/api/user/registration', {
      firstName,
      lastName,
      email,
      password,
      roles
    });
    console.log('data----------------------');
    console.log(response);
    const user = response.data;
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register,
        passwordRecovery,
        passwordTokenValid,
        passwordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
