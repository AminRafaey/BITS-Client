import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const TemplateState = React.createContext(null);
const TemplateDispatch = React.createContext(null);

function TemplateReducer(state, action) {
  let cloneState = stateCloner(state);
  const {
    template,
    selectedTemplateIndex,
    updatedTemplate,
    _id,
  } = action.payload;
  switch (action.type) {
    case 'LOAD_TEMPLATES':
      return [...stateCloner(action.payload.templates)];
    case 'ADD_TEMPLATE':
      return [...cloneState, { ...template }];
    case 'REMOVE_TEMPLATE':
      cloneState.splice(selectedTemplateIndex, 1);
      return [...cloneState];
    case 'UPDATE_TEMPLATE':
      cloneState[selectedTemplateIndex] = { ...updatedTemplate };
      return [...cloneState];
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
  addTemplate,
  removeTemplate,
  updateTemplate,
};

function loadTemplates(dispatch, data) {
  dispatch({
    type: 'LOAD_TEMPLATES',
    payload: data,
  });
}

function addTemplate(dispatch, data) {
  dispatch({
    type: 'ADD_TEMPLATE',
    payload: data,
  });
}

function removeTemplate(dispatch, data) {
  dispatch({
    type: 'REMOVE_TEMPLATE',
    payload: data,
  });
}

function updateTemplate(dispatch, data) {
  dispatch({
    type: 'UPDATE_TEMPLATE',
    payload: data,
  });
}
