import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}label`;
import { labels } from '../../Static/Label';
export async function getLabels() {
  try {
    // const res = await axios.get(endPointApi);
    // return res.data.field.data;
    return labels;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return [];
    } else {
      alert('Server Error!');
      return [];
    }
  }
}
