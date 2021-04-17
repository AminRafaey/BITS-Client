import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const LeadSourceState = React.createContext(null);
const LeadSourceDispatch = React.createContext(null);

function LeadSourceReducer(state, action) {
  const { leadSource } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_LEADSOURCE':
      return [...action.payload.leadSource];
    case 'ADD_LEADSOURCE':
      return [...cloneState, leadSource];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LeadSourceProvider({ children, leadSource }) {
  const [state, dispatch] = React.useReducer(
    LeadSourceReducer,
    leadSource && leadSource.length > 0 ? leadSource : []
  );
  return (
    <LeadSourceState.Provider value={state}>
      <LeadSourceDispatch.Provider value={dispatch}>
        {children}
      </LeadSourceDispatch.Provider>
    </LeadSourceState.Provider>
  );
}

function useLeadSourceState() {
  const context = React.useContext(LeadSourceState);
  if (context === undefined) {
    throw new Error(
      'useLeadSourceState must be used inside a LeadSourceProvider'
    );
  }
  return context;
}

function useLeadSourceDispatch() {
  const context = React.useContext(LeadSourceDispatch);
  if (context === undefined) {
    throw new Error(
      'useLeadSourceDispatch must be used inside a LeadSourceProvider'
    );
  }
  return context;
}

export {
  LeadSourceProvider,
  useLeadSourceState,
  useLeadSourceDispatch,
  loadLeadSource,
  addLeadSource,
};

function loadLeadSource(dispatch, data) {
  dispatch({
    type: 'LOAD_LEADSOURCE',
    payload: data,
  });
}

function addLeadSource(dispatch, data) {
  dispatch({
    type: 'ADD_LEADSOURCE',
    payload: data,
  });
}
