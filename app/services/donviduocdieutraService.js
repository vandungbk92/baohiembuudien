import axios from 'axios';
import { API } from '@api';

function getAll(page, limit, query) {
  query = query ? query : ''
  return axios.get(`${API.DON_VI_DUOC_DIEU_TRA_QUERY.format(page, limit, query)}`).then(res => {
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
  return axios.post(`${API.DON_VI_DUOC_DIEU_TRA}`, data).then(res => {
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

function getById(id) {
  return axios.get(`${API.DON_VI_DUOC_DIEU_TRA_ID.format(id)}`).then(res => {
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
  return axios.delete(`${API.DON_VI_DUOC_DIEU_TRA_ID.format(id)}`).then(res => {
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
  return axios.put(`${API.DON_VI_DUOC_DIEU_TRA_ID.format(id)}`, data).then(res => {
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

export {add, getById, getAll, delById, updateById}
