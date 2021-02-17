import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const TemplateState = React.createContext(null);
const TemplateDispatch = React.createContext(null);

function TemplateReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TEMPLATES':
      return [...stateCloner(action.payload.templates)];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TemplateProvider({ children, template }) {
  const [state, dispatch] = React.useReducer(
    TemplateReducer,
    template && template.length > 0 ? template : []
  );
  return (
    <TemplateState.Provider value={state}>
      <TemplateDispatch.Provider value={dispatch}>
        {children}
      </TemplateDispatch.Provider>
    </TemplateState.Provider>
  );
}

function useTemplateState() {
  const context = React.useContext(TemplateState);
  if (context === undefined) {
    throw new Error('useTemplateState must be used inside a TemplateProvider');
  }
  return context;
}

function useTemplateDispatch() {
  const context = React.useContext(TemplateDispatch);
  if (context === undefined) {
    throw new Error(
      'useTemplateDispatch must be used inside a TemplateProvider'
    );
  }
  return context;
}

export {
  TemplateProvider,
  useTemplateState,
  useTemplateDispatch,
  loadTemplates,
};

function loadTemplates(dispatch, data) {
  dispatch({
    type: 'LOAD_TEMPLATES',
    payload: data,
  });
}
