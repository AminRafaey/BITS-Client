import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const DesignationState = React.createContext(null);
const DesignationDispatch = React.createContext(null);

function DesignationReducer(state, action) {
  const { designation } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_DESIGNATIONS':
      return [...action.payload.designations];
    case 'ADD_DESIGNATION':
      return [...cloneState, designation];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DesignationProvider({ children, designations }) {
  const [state, dispatch] = React.useReducer(
    DesignationReducer,
    designations && designations.length > 0 ? designations : []
  );
  return (
    <DesignationState.Provider value={state}>
      <DesignationDispatch.Provider value={dispatch}>
        {children}
      </DesignationDispatch.Provider>
    </DesignationState.Provider>
  );
}

function useDesignationState() {
  const context = React.useContext(DesignationState);
  if (context === undefined) {
    throw new Error(
      'useDesignationState must be used inside a DesignationProvider'
    );
  }
  return context;
}

function useDesignationDispatch() {
  const context = React.useContext(DesignationDispatch);
  if (context === undefined) {
    throw new Error(
      'useDesignationDispatch must be used inside a DesignationProvider'
    );
  }
  return context;
}

export {
  DesignationProvider,
  useDesignationState,
  useDesignationDispatch,
  loadDesignations,
  addDesignation,
};

function loadDesignations(dispatch, data) {
  dispatch({
    type: 'LOAD_DESIGNATIONS',
    payload: data,
  });
}

function addDesignation(dispatch, data) {
  dispatch({
    type: 'ADD_DESIGNATION',
    payload: data,
  });
}
