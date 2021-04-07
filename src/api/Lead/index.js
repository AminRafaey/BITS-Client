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

export async function addLabelsInLeads(userIdsWithLabels) {
  try {
    // const res = await axios.put(endPointApi, userIdsWithLabels);
    // return res.data;
    return;
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

export async function removeLabelsFromLeads(userIdsWithLabels) {
  try {
    // const res = await axios.put(endPointApi, userIdsWithLabels);
    // return res.data;
    return;
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

export async function sendCSV(file) {
  try {
    const res = await axios.post(`${endPointApi}/csv`, file);
    return res.data;
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

export async function getCompanies() {
  try {
    // const res = await axios.get(`${endPointApi}/companies`);
    // return res.data;
    return companies;
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
    // const res = await axios.get(`${endPointApi}/companies`);
    // return res.data;
    return leadSource;
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
