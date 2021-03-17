import axios from 'axios';
import { API } from '@api';


function delById(id) {
  return axios.delete(`${API.NHIEN_LIEU_ID.format(id)}`).then(res => {
    if (res.data) {
      return res.data;
    }
    else {
      return null
    }
  })
    .catch(error => {
      return null
    });
}


export { delById }
