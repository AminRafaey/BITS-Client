import React from 'react';
import jwtDecode from 'jwt-decode';

const UserState = React.createContext(null);
const UserDispatch = React.createContext(null);
let UserStateRef;

function UserReducer(state, action) {
  const { token } = action.payload;
  const user = token ? jwtDecode(token) : '';
  switch (action.type) {
    case 'LOAD_USER':
      return {
        token: token,
        user: user,
      };
    case 'LOGOUT':
      return {};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children, token }) {
  const user = token ? jwtDecode(token) : '';
  const [state, dispatch] = React.useReducer(
    UserReducer,
    token
      ? {
          token: token,
          user: user,
        }
      : {}
  );
  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserState.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserState);
  UserStateRef = context;
  if (context === undefined) {
    throw new Error('useUserState must be used inside a UserProvider');
  }
  return context;
}

function getUserStateRef() {
  return UserStateRef;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatch);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used inside a UserProvider');
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  getUserStateRef,
  useUserDispatch,
  loadUser,
  logout,
};

function loadUser(dispatch, data) {
  dispatch({
    type: 'LOAD_USER',
    payload: data,
  });
}

function logout(dispatch, data) {
  dispatch({
    type: 'LOGOUT',
    payload: data,
  });
}
