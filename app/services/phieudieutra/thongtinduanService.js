import axios from 'axios';
import { API } from '@api';


function delById(id) {
  return axios.delete(`${API.THONG_TIN_DU_AN_ID.format(id)}`).then(res => {
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

function updateById(id, data) {
  return axios.put(`${API.THONG_TIN_DU_AN_ID.format(id)}`, data).then(res => {
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

function add(data) {
  return axios.post(`${API.THONG_TIN_DU_AN_ADD}`, data).then(res => {
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


export { delById, updateById, add }
