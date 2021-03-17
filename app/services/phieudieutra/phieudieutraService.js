import axios from 'axios';
import { API } from '@api';

function getAll(page, limit, query) {
  query = query ? query : ''
  return axios.get(`${API.PHIEU_DIEU_TRA_QUERY.format(page, limit, query)}`).then(res => {
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
  return axios.post(`${API.PHIEU_DIEU_TRA}`, data).then(res => {
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
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}`).then(res => {
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
  return axios.delete(`${API.PHIEU_DIEU_TRA_ID.format(id)}`).then(res => {
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
  return axios.put(`${API.PHIEU_DIEU_TRA_ID.format(id)}`, data).then(res => {
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

function getDsQuyMo(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/quy-mo-hoat-dong`).then(res => {
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

function postDsQuyMo(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/quy-mo-hoat-dong`, data).then(res => {
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

function getDsNguyenVatLieu(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/nguyen-vat-lieu`).then(res => {
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

function postDsNguyenVatLieu(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/nguyen-vat-lieu`, data).then(res => {
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

export function getDsLuongNuoc(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/luong-nuoc-su-dung`).then(res => {
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

export function postDsLuongNuoc(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/luong-nuoc-su-dung`, data).then(res => {
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


function getDsHoaChat(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/hoa-chat`).then(res => {
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


function postDsHoaChat(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/hoa-chat`, data).then(res => {
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

function getDsNhienLieu(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/nhien-lieu`).then(res => {
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

function postDsNhienLieu(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/nhien-lieu`, data).then(res => {
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

export function getQuyMoChanNuoi(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/quy-mo-chan-nuoi`).then(res => {
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

export function getThongTinDuAn(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/thong-tin-du-an`).then(res => {
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


export function getQuyMoBenhVien(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/quy-mo-benh-vien`).then(res => {
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

export function getHoSoMoiTruong(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/ho-so-moi-truong`).then(res => {
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

export function getKetLuanThanhTra(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/ket-luan-thanh-tra`).then(res => {
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


export {add, getById, getAll, delById, updateById, getDsQuyMo, postDsNhienLieu,
  postDsQuyMo, postDsNguyenVatLieu, getDsNguyenVatLieu, getDsHoaChat, postDsHoaChat, 
  getDsNhienLieu}
