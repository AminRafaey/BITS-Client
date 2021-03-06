import React from 'react';
import io from 'socket.io-client';

const SocketState = React.createContext(null);
const SocketDispatch = React.createContext(null);

function SocketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SOCKET':
      return {
        ...action.payload.socket,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SocketProvider({ children, socket }) {
  const [state, dispatch] = React.useReducer(
    SocketReducer,
    io.connect('http://localhost:4000')
  );
  return (
    <SocketState.Provider value={state}>
      <SocketDispatch.Provider value={dispatch}>
        {children}
      </SocketDispatch.Provider>
    </SocketState.Provider>
  );
}

function useSocketState() {
  const context = React.useContext(SocketState);
  if (context === undefined) {
    throw new Error('useSocketState must be used inside a SocketProvider');
  }
  return context;
}

function useSocketDispatch() {
  const context = React.useContext(SocketDispatch);
  if (context === undefined) {
    throw new Error('useSocketDispatch must be used inside a SocketProvider');
  }
  return context;
}

export { SocketProvider, useSocketState, useSocketDispatch, loadSocket };

function loadSocket(dispatch, data) {
  dispatch({
    type: 'LOAD_SOCKET',
    payload: data,
  });
}
