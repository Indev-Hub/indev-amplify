/* eslint-disable */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Amplify, { API, Auth, Storage, graphqlOperation } from 'aws-amplify';
import { amplifyConfig } from '../config';
import { getUser } from 'src/graphql/queries';


Amplify.configure(amplifyConfig);

async function getUserObject(){
  const user = await Auth.currentAuthenticatedUser();
  return user;
}

async function getUserInfo(){
  try {
    // console.log(getUser());
    const userVariable = await getUserObject();
    const userContent = await API.graphql(graphqlOperation(getUser, {id: userVariable.attributes.sub}));
    const userData = userContent.data.getUser;
    return userData

    // Above logic is retrieving the user data.


    // const userList = await userData.data.getUser;
    // console.log(userList)
    // setUserInfo(userList);
    // sessionStorage.setItem('userInfo', JSON.stringify(userList));
    // console.log('user setItem successful');
    // // error getting user is not defined
    // console.log('list', userList);
  } catch (error) {
    console.log('error on fetching videos', error);
  }
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
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
  REGISTER: (state) => ({ ...state }),
  VERIFY_CODE: (state) => ({ ...state }),
  RESEND_CODE: (state) => ({ ...state }),
  PASSWORD_RECOVERY: (state) => ({ ...state }),
  PASSWORD_RESET: (state) => ({ ...state })
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

const AuthContext = createContext({
  ...initialState,
  platform: 'Amplify',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  resendCode: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordReset: () => Promise.resolve()
});


export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  // This below gets the user profile picture
  const fetchAvatar = async (userid) => {
    try {
      const avatar = await Storage.get(`user/${userid}/avatar.png`)
      console.log('This is an avatar', avatar)
      // setfileUrl(avatar)
      return avatar
    } catch (err){
      console.log('error fetching image', err)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const avatarUrl = await fetchAvatar(user.attributes.sub)
        const userData = await getUserInfo();
        // Here you should extract the complete user profile to make it
        // available in your entire app.
        // The auth state only provides basic information.
        console.log('This is user', user)
        console.log('This is userData', userData)
        console.log('This is user avatar', avatarUrl)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true, 
            user: {
              id: user.attributes.sub,
              avatar: avatarUrl,
              email: user.attributes.email,
              name: user.username,
              plan: 'Premium',
              userTable: userData
            }
          }
        });
      } catch (error) {
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
    const user = await Auth.signIn(email, password);

    if (user.challengeName) {
      console.error(`Unable to login, because challenge "${user.challengeName}" is mandated and we did not handle this case.`);
      return;
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          id: user.attributes.sub,
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: user.attributes.email,
          name: 'Jane Rotanson',
          plan: 'Premium'
        }
      }
    });
  };

  const logout = async () => {
    await Auth.signOut();
    dispatch({
      type: 'LOGOUT'
    });
  };

  const register = async (username, email, password) => {
    await Auth.signUp({
      username: username,
      // email: email,
      password,
      attributes: { email }
    });
    dispatch({
      type: 'REGISTER'
    });
  };

  const verifyCode = async (username, code) => {
    await Auth.confirmSignUp(username, code);
    dispatch({
      type: 'VERIFY_CODE'
    });
  };

  const resendCode = async (username) => {
    await Auth.resendSignUp(username);
    dispatch({
      type: 'RESEND_CODE'
    });
  };

  const passwordRecovery = async (username) => {
    await Auth.forgotPassword(username);
    dispatch({
      type: 'PASSWORD_RECOVERY'
    });
  };

  const passwordReset = async (username, code, newPassword) => {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
    dispatch({
      type: 'PASSWORD_RESET'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Amplify',
        login,
        logout,
        register,
        verifyCode,
        resendCode,
        passwordRecovery,
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
