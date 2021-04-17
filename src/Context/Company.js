import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const CompanyState = React.createContext(null);
const CompanyDispatch = React.createContext(null);

function CompanyReducer(state, action) {
  const { company } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_COMPANIES':
      return [...action.payload.companies];
    case 'ADD_COMPANY':
      return [...cloneState, company];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CompanyProvider({ children, companies }) {
  const [state, dispatch] = React.useReducer(
    CompanyReducer,
    companies && companies.length > 0 ? companies : []
  );
  return (
    <CompanyState.Provider value={state}>
      <CompanyDispatch.Provider value={dispatch}>
        {children}
      </CompanyDispatch.Provider>
    </CompanyState.Provider>
  );
}

function useCompanyState() {
  const context = React.useContext(CompanyState);
  if (context === undefined) {
    throw new Error('useCompanyState must be used inside a CompanyProvider');
  }
  return context;
}

function useCompanyDispatch() {
  const context = React.useContext(CompanyDispatch);
  if (context === undefined) {
    throw new Error('useCompanyDispatch must be used inside a CompanyProvider');
  }
  return context;
}

export {
  CompanyProvider,
  useCompanyState,
  useCompanyDispatch,
  loadCompanies,
  addCompany,
};

function loadCompanies(dispatch, data) {
  dispatch({
    type: 'LOAD_COMPANIES',
    payload: data,
  });
}

function addCompany(dispatch, data) {
  dispatch({
    type: 'ADD_COMPANY',
    payload: data,
  });
}
