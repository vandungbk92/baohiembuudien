import axios from 'axios';
import { API } from '@api';

function getAll() {
  return axios.get(`${API.THONG_TIN_HOAT_DONG}`).then(res => {
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



export {getAll}
