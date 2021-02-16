import React from 'react';

const ConnectStatusState = React.createContext(null);
const ConnectStatusDispatch = React.createContext(null);

function ConnectStatusReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_STATUS':
      return action.payload.status;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ConnectStatusProvider({ children, connectStatus }) {
  const [state, dispatch] = React.useReducer(
    ConnectStatusReducer,
    connectStatus ? connectStatus : false
  );
  return (
    <ConnectStatusState.Provider value={state}>
      <ConnectStatusDispatch.Provider value={dispatch}>
        {children}
      </ConnectStatusDispatch.Provider>
    </ConnectStatusState.Provider>
  );
}

function useConnectStatusState() {
  const context = React.useContext(ConnectStatusState);
  if (context === undefined) {
    throw new Error(
      'useConnectStatusState must be used inside a ConnectStatusProvider'
    );
  }
  return context;
}

function useConnectStatusDispatch() {
  const context = React.useContext(ConnectStatusDispatch);
  if (context === undefined) {
    throw new Error(
      'useConnectStatusDispatch must be used inside a ConnectStatusProvider'
    );
  }
  return context;
}

export {
  ConnectStatusProvider,
  useConnectStatusState,
  useConnectStatusDispatch,
  updateStatus,
};

function updateStatus(dispatch, data) {
  dispatch({
    type: 'UPDATE_STATUS',
    payload: data,
  });
}
