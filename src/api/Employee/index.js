import config from '../../config.json';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}employee`;
import axiosConfig from '../AxiosConfig';

export async function getEmployees() {
  try {
    const res = await axiosConfig(endPointApi + '/all', 'get');

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex.message;
    }
    throw '';
  }
}

export async function createEmployee(employeeData) {
  try {
    const res = await axiosConfig(endPointApi, 'post', undefined, employeeData);

    toastActions.success(res.data.field.message);
    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function updateEmployee(updatedEmployee) {
  try {
    const res = await axiosConfig(
      endPointApi,
      'put',
      undefined,
      updatedEmployee
    );

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      throw ex;
    }
    throw '';
  }
}

export async function updateEmployeeAccess(updatedEmployees) {
  try {
    const res = await axiosConfig(endPointApi + '/access', 'put', undefined, {
      employees: updatedEmployees,
    });

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function removeEmployee(employeeId) {
  try {
    const res = await axiosConfig(endPointApi, 'delete', {
      employeeId: employeeId,
    });
    toastActions.success(`Employee is successfully deleted`);
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function getDesignations() {
  try {
    const res = await axiosConfig(`${endPointApi}/allDesignations`, 'get');

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function getFilteredEmployees(filters) {
  try {
    const res = await axiosConfig(`${endPointApi}/filter`, 'get', filters);

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function updateEmployeeStatus(_id, status) {
  try {
    const res = await axiosConfig(endPointApi + '/status', 'put', undefined, {
      _id,
      status,
    });

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}
