import React from 'react';
import stateCloner from '../components/utility/StateCloner';
import { labels } from '../Static/Label';

const LabelState = React.createContext(null);
const LabelDispatch = React.createContext(null);

function LabelReducer(state, action) {
  const { _id, label } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_LABELS':
      return { ...stateCloner(action.payload.labels) };
    case 'ADD_LABEL':
      cloneState[_id] = { ...label, _id };
      return { ...cloneState };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LabelProvider({ children, label }) {
  const [state, dispatch] = React.useReducer(
    LabelReducer,
    label && Object.entries(label).length > 0 ? label : {}
  );
  return (
    <LabelState.Provider value={state}>
      <LabelDispatch.Provider value={dispatch}>
        {children}
      </LabelDispatch.Provider>
    </LabelState.Provider>
  );
}

function useLabelState() {
  const context = React.useContext(LabelState);
  if (context === undefined) {
    throw new Error('useLabelState must be used inside a LabelProvider');
  }
  return context;
}

function useLabelDispatch() {
  const context = React.useContext(LabelDispatch);
  if (context === undefined) {
    throw new Error('useLabelDispatch must be used inside a LabelProvider');
  }
  return context;
}

export { LabelProvider, useLabelState, useLabelDispatch, loadLabels, addLabel };

function loadLabels(dispatch, data) {
  dispatch({
    type: 'LOAD_LABELS',
    payload: data,
  });
}

function addLabel(dispatch, data) {
  dispatch({
    type: 'ADD_LABEL',
    payload: data,
  });
}
