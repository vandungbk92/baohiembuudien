import axios from 'axios';
import { API } from '@api';


function delById(id) {
  return axios.delete(`${API.LUONG_NUOC_SU_DUNG_ID.format(id)}`).then(res => {
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
