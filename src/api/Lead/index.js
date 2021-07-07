import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
import { updateLead as updateLeadInContext } from '../../Context/Lead';
const endPointApi = `${config.baseUrl}lead`;
import axiosConfig from '../AxiosConfig';

export async function getLeads() {
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

export async function getLeadByPhone(phone) {
  try {
    const res = await axiosConfig(endPointApi + '/phone', 'get', phone);

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex.message;
    }
    throw '';
  }
}

export async function createLead(leadData) {
  try {
    const res = await axiosConfig(
      endPointApi + '/create',
      'post',
      undefined,
      leadData
    );

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function updateLead(updatedLead) {
  try {
    const res = await axiosConfig(endPointApi, 'put', undefined, updatedLead);

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      throw ex;
    }
    throw '';
  }
}

export async function updateLeadWithContext(
  updatedLead,
  leadsDispatch,
  selectedLeadIndex
) {
  try {
    const res = await axiosConfig(endPointApi, 'put', undefined, updatedLead);

    updateLeadInContext(leadsDispatch, {
      leadData: { ...res.data.field.data },
      selectedLeadIndex: selectedLeadIndex,
    });
    toastActions.success('Previous lead updated successfully');
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message + "So, previous lead isn't updated.");
      throw ex;
    }
    throw '';
  }
}

export async function removeLeads(leads) {
  try {
    const res = await axiosConfig(endPointApi, 'delete', {
      leads: JSON.stringify(leads),
    });

    toastActions.success(
      `Lead${leads.length > 1 ? 's ' : ' '}${
        leads.length > 1 ? 'are ' : 'is '
      } Successfully deleted`
    );
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function updateLeadsLabels(updatedLeads, prevState) {
  try {
    const res = await axiosConfig(endPointApi + '/labels', 'put', undefined, {
      leads: updatedLeads,
    });

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw { prevState, error: ex };
    }
    throw '';
  }
}

// Use header of multistream as it is sending a file
export async function sendCSV(file) {
  try {
    const res = await axios.post(`${endPointApi}/csvUpload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.field;
  } catch (ex) {
    if (!ex.response) {
      throw 'Please check your internet connection or close a file before uploading';
    } else {
      throw ex.response.data.field.message;
    }
  }
}

export async function sendXLSX(file) {
  try {
    const res = await axios.post(`${endPointApi}/xlsxUpload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.field;
  } catch (ex) {
    if (!ex.response) {
      throw 'Please check your internet connection or close a file before uploading';
    } else {
      throw ex.response.data.field.message;
    }
  }
}

export async function getCompanies() {
  try {
    const res = await axiosConfig(`${endPointApi}/allCompanies`, 'get');

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function getLeadSource() {
  try {
    const res = await axiosConfig(`${endPointApi}/allLeadSources`, 'get');

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function getFilteredLeads(filters) {
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
