import axios from 'axios';
import { API } from '@api';

function getAll(page, limit, query) {
  query = query ? query : ''
  return axios.get(`${API.CHAT_THAI_SINH_HOAT_QUERY.format(page, limit, query)}`).then(res => {
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
  return axios.post(`${API.CHAT_THAI_SINH_HOAT}`, data).then(res => {
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
  return axios.get(`${API.CHAT_THAI_SINH_HOAT_ID.format(id)}`).then(res => {
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
  return axios.delete(`${API.CHAT_THAI_SINH_HOAT_ID.format(id)}`).then(res => {
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
  return axios.put(`${API.CHAT_THAI_SINH_HOAT_ID.format(id)}`, data).then(res => {
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