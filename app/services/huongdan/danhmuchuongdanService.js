import axios from "axios";
import { API } from "@api";

export function getAll(page, limit, query) {
  query = query ? query : "";
  return axios
    .get(`${API.DANHMUC_HUONGDAN_QUERY.format(page, limit, query)}`)
    .then(res => {
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

export function getById(id) {
  return axios
    .get(`${API.DANHMUC_HUONGDAN_ID.format(id)}`)
    .then(res => {
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

export function add(data) {
  return axios
    .post(`${API.DANHMUC_HUONGDAN}`, data)
    .then(res => {
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

export function updateById(id, data) {
  return axios
    .put(`${API.DANHMUC_HUONGDAN_ID.format(id)}`, data)
    .then(res => {
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

export function delById(id) {
  return axios
    .delete(`${API.DANHMUC_HUONGDAN_ID.format(id)}`)
    .then(res => {
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
