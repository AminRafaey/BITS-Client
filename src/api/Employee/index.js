import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}employee`;

export async function getEmployees() {
  try {
    const res = await axios.get(endPointApi + '/all');
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      toastActions.error(ex.response.data.field.message);
      throw new Error('Server Error!');
    }
  }
}

export async function createEmployee(employeeData) {
  try {
    const res = await axios.post(endPointApi, employeeData);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw ex.response.data.field;
    }
  }
}

export async function updateEmployee(updatedEmployee) {
  try {
    const res = await axios.put(endPointApi, updatedEmployee);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      throw new Error('Please check your internet connection');
    } else {
      throw ex.response.data.field;
    }
  }
}

export async function removeEmployee(employeeId) {
  try {
    const res = await axios.delete(endPointApi, {
      params: { employeeId: employeeId },
    });
    toastActions.success(`Employee is successfully deleted`);
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Exception!';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw 'Exception!';
    }
  }
}

export async function getDesignations() {
  try {
    const res = await axios.get(`${endPointApi}/allDesignations`);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
    } else {
      toastActions.error('Server Error!');
    }
  }
}

export async function getFilteredEmployees(filters) {
  try {
    const res = await axios.get(`${endPointApi}/filter`, { params: filters });
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
    } else {
      toastActions.error('Server Error!');
    }
  }
}
