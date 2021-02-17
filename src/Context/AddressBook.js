import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const AddressBookState = React.createContext(null);
const AddressBookDispatch = React.createContext(null);

function AddressBookReducer(state, action) {
  const { selected, _id, startingIndex, endingIndex } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_ADDRESSBOOK':
      return [...stateCloner(action.payload.addressBook)];
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AddressBookProvider({ children, addressBook }) {
  const [state, dispatch] = React.useReducer(
    AddressBookReducer,
    addressBook && addressBook.length > 0 ? addressBook : []
  );
  return (
    <AddressBookState.Provider value={state}>
      <AddressBookDispatch.Provider value={dispatch}>
        {children}
      </AddressBookDispatch.Provider>
    </AddressBookState.Provider>
  );
}

function useAddressBookState() {
  const context = React.useContext(AddressBookState);
  if (context === undefined) {
    throw new Error(
      'useAddressBookState must be used inside a AddressBookProvider'
    );
  }
  return context;
}

function useAddressBookDispatch() {
  const context = React.useContext(AddressBookDispatch);
  if (context === undefined) {
    throw new Error(
      'useAddressBookDispatch must be used inside a AddressBookProvider'
    );
  }
  return context;
}

export {
  AddressBookProvider,
  useAddressBookState,
  useAddressBookDispatch,
  loadAddressBook,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
};

function loadAddressBook(dispatch, data) {
  dispatch({
    type: 'LOAD_ADDRESSBOOK',
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
