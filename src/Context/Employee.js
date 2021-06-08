import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const EmployeeState = React.createContext([]);
const EmployeeDispatch = React.createContext(null);

function employeeReducer(state, action) {
  const { selected, _id, startingIndex, endingIndex } = action.payload;
  const { employeeData, employees, selectedEmployeeIndex } = action.payload;
  const { propertyName, propertyValue } = action.payload;
  let cloneState = stateCloner(state);
  switch (action.type) {
    case 'LOAD_EMPLOYEE':
      return [...stateCloner(action.payload.employees)];
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
    case 'ADD_EMPLOYEES':
      return [...employees, ...cloneState];
    case 'ADD_EMPLOYEE':
      return [{ ...employeeData }, ...cloneState];
    case 'REMOVE_EMPLOYEES':
      cloneState = cloneState.filter((c) => !c.selected);
      return [...cloneState];
    case 'REMOVE_EMPLOYEE':
      cloneState.splice(selectedEmployeeIndex, 1);
      return [...cloneState];
    case 'UPDATE_EMPLOYEE':
      cloneState[selectedEmployeeIndex] = employeeData;
      return [...cloneState];
    case 'UPDATE_EMPLOYEE_ACCESS':
      cloneState[selectedEmployeeIndex][propertyName] = propertyValue;
      return [...cloneState];

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function EmployeeProvider({ children, employee }) {
  const [state, dispatch] = React.useReducer(
    employeeReducer,
    employee && employee.length > 0 ? employee : []
  );
  return (
    <EmployeeState.Provider value={state}>
      <EmployeeDispatch.Provider value={dispatch}>
        {children}
      </EmployeeDispatch.Provider>
    </EmployeeState.Provider>
  );
}

function useEmployeeState() {
  const context = React.useContext(EmployeeState);
  if (context === undefined) {
    throw new Error('useEmployeeState must be used inside a EmployeeProvider');
  }
  return context;
}

function useEmployeeDispatch() {
  const context = React.useContext(EmployeeDispatch);
  if (context === undefined) {
    throw new Error(
      'useEmployeeDispatch must be used inside a EmployeeProvider'
    );
  }
  return context;
}

export {
  EmployeeProvider,
  useEmployeeState,
  useEmployeeDispatch,
  loadEmployee,
  handleSelectedStatus,
  handleMultipleSelectedStatus,
  addEmployee,
  addEmployees,
  removeEmployees,
  updateEmployee,
  removeEmployee,
  updateEmployeeAccess,
};

function loadEmployee(dispatch, data) {
  dispatch({
    type: 'LOAD_EMPLOYEE',
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

function addEmployee(dispatch, data) {
  dispatch({
    type: 'ADD_EMPLOYEE',
    payload: data,
  });
}
function addEmployees(dispatch, data) {
  dispatch({
    type: 'ADD_EMPLOYEES',
    payload: data,
  });
}
function removeEmployees(dispatch, data) {
  dispatch({
    type: 'REMOVE_EMPLOYEES',
    payload: data,
  });
}
function removeEmployee(dispatch, data) {
  dispatch({
    type: 'REMOVE_EMPLOYEE',
    payload: data,
  });
}
function updateEmployee(dispatch, data) {
  dispatch({
    type: 'UPDATE_EMPLOYEE',
    payload: data,
  });
}

function updateEmployeeAccess(dispatch, data) {
  dispatch({
    type: 'UPDATE_EMPLOYEE_ACCESS',
    payload: data,
  });
}
