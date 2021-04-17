import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}lead`;
import { companies } from '../../Static/Company';
import { leadSource } from '../../Static/LeadSource';

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
