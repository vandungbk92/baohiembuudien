import axios from 'axios';
import { API } from '@api';


function getDataPhieu(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/in-phieu`).then(res => {
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

export { getDataPhieu }
