import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}lead`;

export async function createLead(leadData) {
  try {
    const res = await axios.post(endPointApi + '/create', leadData);
    return res.data;
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
