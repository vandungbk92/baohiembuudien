import axios from 'axios';
import { API } from '@api';


function add(data) {
  return axios.post(`${API.HO_SO_MOI_TRUONG_ADD}`, data).then(res => {
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


function delById(id) {
  return axios.delete(`${API.HO_SO_MOI_TRUONG_ID.format(id)}`).then(res => {
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
  return axios.put(`${API.HO_SO_MOI_TRUONG_ID.format(id)}`, data).then(res => {
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

export {add , delById, updateById}
