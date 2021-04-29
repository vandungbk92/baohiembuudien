import axios from 'axios';
import { API } from '@api';

export function add(data) {
  return axios.post(`${API.THONG_TIN_CHUNG}`, data).then(res => {
    if (res.data) {
      return res.data;
    } else {
      return null;
    }
  }).catch(error => {
    return null;
  });
}

export function getOne(query) {
  query = query ? query : '';
  return axios.get(`${API.THONG_TIN_CHUNG_QUERY.format(query)}`).then(res => {
    if (res.data) {
      return res.data;
    } else {
      return null;
    }
  })
    .catch(error => {
      return null;
    });
}

export function update(id, data) {
  delete data._id;
  return axios.put(`${API.THONG_TIN_CHUNG_ID.format(id)}`, data).then(res => {
    if (res.data) {
      return res.data;
    } else {
      return null;
    }
  })
    .catch(error => {
      return null;
    });
}
