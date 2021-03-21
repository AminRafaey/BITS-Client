import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}lead/create`;

export async function createLead(leadData) {
  try {
    console.log('here');
    const res = await axios.post(endPointApi, leadData);
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
