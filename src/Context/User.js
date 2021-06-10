import React from 'react';
import jwtDecode from 'jwt-decode';

const UserState = React.createContext(null);
const UserDispatch = React.createContext(null);

function UserReducer(state, action) {
  const { token } = action.payload;
  const user = jwtDecode(token);
  switch (action.type) {
    case 'LOAD_USER':
      return {
        token: token,
        user: user,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children, user }) {
  const [state, dispatch] = React.useReducer(UserReducer, { ...user });
  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserState.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserState);
  if (context === undefined) {
    throw new Error('useUserState must be used inside a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatch);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used inside a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loadUser };

function loadUser(dispatch, data) {
  dispatch({
    type: 'LOAD_USER',
    payload: data,
  });
}
