import axios from 'axios';
import { API } from '@api';


function getThongTinChatThai(id) {
  return axios.get(`${API.PHIEU_DIEU_TRA_ID.format(id)}/thong-tin-chat-thai`).then(res => {
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

function postThongTinChatThai(id, data) {
  return axios.post(`${API.PHIEU_DIEU_TRA_ID.format(id)}/thong-tin-chat-thai`, data).then(res => {
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


export { getThongTinChatThai, postThongTinChatThai }
