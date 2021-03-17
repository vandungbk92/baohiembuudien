import axios from 'axios';
import { API } from '@api';


function add(data) {
  return axios.post(`${API.QUY_MO_BENH_VIEN}`, data).then(res => {
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
  return axios.delete(`${API.QUY_MO_BENH_VIEN_ID.format(id)}`).then(res => {
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
  return axios.put(`${API.QUY_MO_BENH_VIEN_ID.format(id)}`, data).then(res => {
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
