import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const LeadsState = React.createContext([]);
const LeadsDispatch = React.createContext(null);

function LeadsReducer(state, action) {
  const { selected, _id, startingIndex, endingIndex } = action.payload;
  const { selectedLeads, labels } = action.payload;
  const { leadData, leads, selectedLeadIndex } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_LEADS':
      return [...stateCloner(action.payload.leads)];
    case 'HANDLE_SELECTED_STATUS':
      return cloneState.map((s) =>
        s._id == _id ? { ...s, selected: selected } : { ...s }
      );
    case 'HANDLE_MULTIPLE_SELECTED_STATUS':
      cloneState.slice(startingIndex, endingIndex).map((s, index) => {
        cloneState[startingIndex + index] = {
          ...cloneState[startingIndex + index],
          selected: selected,
        };
      });
      return [...cloneState];
    case 'ADD_LABELS':
      selectedLeads.map((s) => {
        labels.map((l) => {
          !cloneState[s.index]['labels'].find((c) => c == l._id) &&
            cloneState[s.index]['labels'].push(l._id);
        });
      });
      return [...cloneState];
    case 'REMOVE_LABELS':
      selectedLeads.map((s) => {
        labels.map((l) => {
          cloneState[s.index]['labels'] = cloneState[s.index]['labels'].filter(
            (c) => c !== l._id
          );
        });
      });
      return [...cloneState];
    case 'ADD_LEADS':
      return [...leads, ...cloneState];
    case 'ADD_LEAD':
      return [{ ...leadData }, ...cloneState];
    case 'REMOVE_LEADS':
      cloneState = cloneState.filter((c) => !c.selected);
      return [...cloneState];
    case 'REMOVE_LEAD':
      cloneState.splice(selectedLeadIndex, 1);
      return [...cloneState];
    case 'UPDATE_LEAD':
      cloneState[selectedLeadIndex] = leadData;
      return [...cloneState];

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LeadsProvider({ children, leads }) {
  const [state, dispatch] = React.useReducer(
    LeadsReducer,
    leads && leads.length > 0 ? leads : []
  );
  return (
    <LeadsState.Provider value={state}>
      <LeadsDispatch.Provider value={dispatch}>
        {children}
      </LeadsDispatch.Provider>
    </LeadsState.Provider>
  );
}

function useLeadsState() {
  const context = React.useContext(LeadsState);
  if (context === undefined) {
    throw new Error('useLeadsState must be used inside a LeadsProvider');
  }
  return context;
}

function useLeadsDispatch() {
  const context = React.useContext(LeadsDispatch);
  if (context === undefined) {
    throw new Error('useLeadsDispatch must be used inside a LeadsProvider');
  }
  return context;
}

export {
  LeadsProvider,
  useLeadsState,
  useLeadsDispatch,
  loadLeads,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
  addLabels,
  removeLabels,
  addLead,
  addLeads,
  removeLeads,
  updateLead,
  removeLead,
};

function loadLeads(dispatch, data) {
  dispatch({
    type: 'LOAD_LEADS',
    payload: data,
  });
}

function handleSelectedStatus(dispatch, data) {
  dispatch({
    type: 'HANDLE_SELECTED_STATUS',
    payload: data,
  });
}
function handleMultipleSelectedStatus(dispatch, data) {
  dispatch({
    type: 'HANDLE_MULTIPLE_SELECTED_STATUS',
    payload: data,
  });
}

function addLabels(dispatch, data) {
  dispatch({
    type: 'ADD_LABELS',
    payload: data,
  });
}

function removeLabels(dispatch, data) {
  dispatch({
    type: 'REMOVE_LABELS',
    payload: data,
  });
}
function addLead(dispatch, data) {
  dispatch({
    type: 'ADD_LEAD',
    payload: data,
  });
}
function addLeads(dispatch, data) {
  dispatch({
    type: 'ADD_LEADS',
    payload: data,
  });
}
function removeLeads(dispatch, data) {
  dispatch({
    type: 'REMOVE_LEADS',
    payload: data,
  });
}
function removeLead(dispatch, data) {
  dispatch({
    type: 'REMOVE_LEAD',
    payload: data,
  });
}
function updateLead(dispatch, data) {
  dispatch({
    type: 'UPDATE_LEAD',
    payload: data,
  });
}
