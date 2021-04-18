import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}lead`;

export async function getLeads(leadData) {
  try {
    const res = await axios.get(endPointApi + '/all');
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      alert('Server Error!');
      throw new Error('Server Error!');
    }
  }
}

export async function createLead(leadData) {
  try {
    const res = await axios.post(endPointApi + '/create', leadData);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      throw ex.response.data.field;
    }
  }
}

export async function updateLead(updatedLead) {
  try {
    const res = await axios.put(endPointApi, updatedLead);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      throw new Error('Please check your internet connection');
    } else {
      throw ex.response.data.field;
    }
  }
}

export async function removeLeads(leads) {
  try {
    const res = await axios.delete(endPointApi, {
      params: { leads: JSON.stringify(leads) },
    });
    toastActions.success(
      `Lead${leads.length > 1 ? 's ' : ' '}${
        leads.length > 1 ? 'are ' : 'is '
      } Successfully deleted`
    );
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

export async function updateLeadsLabels(updatedLeads, prevState) {
  try {
    const res = await axios.put(endPointApi + '/labels', {
      leads: updatedLeads,
    });
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      throw { prevState, error: ex.response.data.field };
    }
  }
}

export async function sendCSV(file) {
  try {
    const res = await axios.post(`${endPointApi}/csvUpload`, file);
    return res.data.field.message;
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
    const res = await axios.get(`${endPointApi}/allCompanies`);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return;
    } else {
      alert('Server Error!');
      return;
    }
  }
}

export async function getLeadSource() {
  try {
    const res = await axios.get(`${endPointApi}/allLeadSources`);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return;
    } else {
      alert('Server Error!');
      return;
    }
  }
}

export async function getFilteredLeads(filters) {
  try {
    const res = await axios.get(`${endPointApi}/filter`, { params: filters });
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
    } else {
      alert('Server Error!');
    }
  }
}
