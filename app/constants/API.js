export const API = {
  FILE: '/api/files',

  LOGIN: '/api/users/login',
  
  USER_INFO: '/api/users/me',
  USER: '/api/users',
  USER_QUERY: '/api/users?page={0}&limit={1}{2}',
  USER_ID: '/api/users/{0}',

  USER_RESET_PASSWORD: '/api/users/reset-password',
  USER_CHANGE_PASSWORD: '/api/users/change-password',
  USER_FORGET_PASSWORD: '/api/users/forgot-password-mail',

  TINH_THANH: '/api/tinh-thanh',
  TINH_THANH_QUERY: '/api/tinh-thanh?page={0}&limit={1}{2}',
  TINH_THANH_ID: '/api/tinh-thanh/{0}',

  QUAN_HUYEN: '/api/quan-huyen',
  QUAN_HUYEN_QUERY: '/api/quan-huyen?page={0}&limit={1}{2}',
  QUAN_HUYEN_ID: '/api/quan-huyen/{0}',

  PHUONG_XA: '/api/phuong-xa',
  PHUONG_XA_QUERY: '/api/phuong-xa?page={0}&limit={1}{2}',
  PHUONG_XA_ID: '/api/phuong-xa/{0}',

  LOAI_PHIEU: '/api/loai-phieu',
  LOAI_PHIEU_QUERY: '/api/loai-phieu?page={0}&limit={1}{2}',
  LOAI_PHIEU_ID: '/api/loai-phieu/{0}',

  SETTING: '/api/setting',
  SETTING_ID: '/api/setting/{0}',

  LOAI_HINH_KINH_TE: '/api/loai-hinh-kinh-te',
  LOAI_HINH_KINH_TE_QUERY: '/api/loai-hinh-kinh-te?page={0}&limit={1}{2}',
  LOAI_HINH_KINH_TE_ID: '/api/loai-hinh-kinh-te/{0}',

  LOAI_HINH_THUC_HIEN: '/api/loai-hinh-thuc-hien',
  LOAI_HINH_THUC_HIEN_QUERY: '/api/loai-hinh-thuc-hien?page={0}&limit={1}{2}',
  LOAI_HINH_THUC_HIEN_ID: '/api/loai-hinh-thuc-hien/{0}',

  XEP_HANG_CSYT: '/api/xep-hang-csyt',
  XEP_HANG_CSYT_QUERY: '/api/xep-hang-csyt?page={0}&limit={1}{2}',
  XEP_HANG_CSYT_ID: '/api/xep-hang-csyt/{0}',

  DON_VI_DUOC_DIEU_TRA: '/api/don-vi-duoc-dieu-tra',
  DON_VI_DUOC_DIEU_TRA_QUERY: '/api/don-vi-duoc-dieu-tra?page={0}&limit={1}{2}',
  DON_VI_DUOC_DIEU_TRA_ID: '/api/don-vi-duoc-dieu-tra/{0}',

  DM_DON_VI_DUOC_DIEU_TRA: '/api/dm-don-vi-duoc-dieu-tra',
  DM_DON_VI_DUOC_DIEU_TRA_QUERY: '/api/dm-don-vi-duoc-dieu-tra?page={0}&limit={1}{2}',
  DM_DON_VI_DUOC_DIEU_TRA_ID: '/api/dm-don-vi-duoc-dieu-tra/{0}',

  HOAT_DONG_DON_VI: '/api/hoat-dong-don-vi',
  HOAT_DONG_DON_VI_QUERY: '/api/hoat-dong-don-vi?page={0}&limit={1}{2}',
  HOAT_DONG_DON_VI_ID: '/api/hoat-dong-don-vi/{0}',

  QUY_MO_HOAT_DONG: '/api/quy-mo-hoat-dong',
  QUY_MO_HOAT_DONG_QUERY: '/api/quy-mo-hoat-dong?page={0}&limit={1}{2}',
  QUY_MO_HOAT_DONG_ID: '/api/quy-mo-hoat-dong/{0}',
  HOA_CHAT_ID: '/api/hoa-chat/{0}',
  NGUYEN_VAT_LIEU_ID: '/api/nguyen-vat-lieu/{0}',
  LUONG_NUOC_SU_DUNG_ID: '/api/luong-nuoc-su-dung/{0}',

  SAN_PHAM: '/api/san-pham',
  SAN_PHAM_QUERY: '/api/san-pham?page={0}&limit={1}{2}',
  SAN_PHAM_ID: '/api/san-pham/{0}',

  CONG_NGHE_SAN_XUAT: '/api/cong-nghe-san-xuat',
  CONG_NGHE_SAN_XUAT_QUERY: '/api/cong-nghe-san-xuat?page={0}&limit={1}{2}',
  CONG_NGHE_SAN_XUAT_ID: '/api/cong-nghe-san-xuat/{0}',

  DON_VI: '/api/don-vi',
  DON_VI_QUERY: '/api/don-vi?page={0}&limit={1}{2}',
  DON_VI_ID: '/api/don-vi/{0}',

  HOA_CHAT_SU_DUNG: '/api/hoa-chat-su-dung',
  HOA_CHAT_SU_DUNG_QUERY: '/api/hoa-chat-su-dung?page={0}&limit={1}{2}',
  HOA_CHAT_SU_DUNG_ID: '/api/hoa-chat-su-dung/{0}',

  DM_NGUYEN_VAT_LIEU: '/api/dm-nguyen-vat-lieu',
  DM_NGUYEN_VAT_LIEU_QUERY: '/api/dm-nguyen-vat-lieu?page={0}&limit={1}{2}',
  DM_NGUYEN_VAT_LIEU_ID: '/api/dm-nguyen-vat-lieu/{0}',

  PHIEU_DIEU_TRA: '/api/phieu-dieu-tra',
  PHIEU_DIEU_TRA_QUERY: '/api/phieu-dieu-tra?page={0}&limit={1}{2}',
  PHIEU_DIEU_TRA_ID: '/api/phieu-dieu-tra/{0}',

  CHAT_THAI_SINH_HOAT: '/api/chat-thai-sinh-hoat',
  CHAT_THAI_SINH_HOAT_QUERY: '/api/chat-thai-sinh-hoat?page={0}&limit={1}{2}',
  CHAT_THAI_SINH_HOAT_ID: '/api/chat-thai-sinh-hoat/{0}',

  CHAT_THAI_CONG_NGHIEP: '/api/chat-thai-cong-nghiep',
  CHAT_THAI_CONG_NGHIEP_QUERY: '/api/chat-thai-cong-nghiep?page={0}&limit={1}{2}',
  CHAT_THAI_CONG_NGHIEP_ID: '/api/chat-thai-cong-nghiep/{0}',

  CHAT_THAI_NGUY_HAI: '/api/chat-thai-nguy-hai',
  CHAT_THAI_NGUY_HAI_QUERY: '/api/chat-thai-nguy-hai?page={0}&limit={1}{2}',
  CHAT_THAI_NGUY_HAI_ID: '/api/chat-thai-nguy-hai/{0}',

  CHAT_THAI_CHAN_NUOI: '/api/chat-thai-chan-nuoi',
  CHAT_THAI_CHAN_NUOI_QUERY: '/api/chat-thai-chan-nuoi?page={0}&limit={1}{2}',
  CHAT_THAI_CHAN_NUOI_ID: '/api/chat-thai-chan-nuoi/{0}',

  NHIEN_LIEU_TIEU_THU: '/api/nhien-lieu-tieu-thu',
  NHIEN_LIEU_TIEU_THU_QUERY: '/api/nhien-lieu-tieu-thu?page={0}&limit={1}{2}',
  NHIEN_LIEU_TIEU_THU_ID: '/api/nhien-lieu-tieu-thu/{0}',

  LOAI_HINH_CHAN_NUOI: '/api/loai-hinh-chan-nuoi',
  LOAI_HINH_CHAN_NUOI_QUERY: '/api/loai-hinh-chan-nuoi?page={0}&limit={1}{2}',
  LOAI_HINH_CHAN_NUOI_ID: '/api/loai-hinh-chan-nuoi/{0}',

  QUY_MO_BENH_VIEN: '/api/quy-mo-benh-vien',
  QUY_MO_BENH_VIEN_ID: '/api/quy-mo-benh-vien/{0}',

  LOAI_HOAT_DONG: '/api/loai-hoat-dong',
  LOAI_HOAT_DONG_QUERY: '/api/loai-hoat-dong?page={0}&limit={1}{2}',
  LOAI_HOAT_DONG_ID: '/api/loai-hoat-dong/{0}',

  XU_LY_NUOC_THAI: '/api/xu-ly-nuoc-thai',
  XU_LY_NUOC_THAI_QUERY: '/api/xu-ly-nuoc-thai?page={0}&limit={1}{2}',
  XU_LY_NUOC_THAI_ID: '/api/xu-ly-nuoc-thai/{0}',

  THONG_TIN_NUOC_THAI: '/api/thong-tin-nuoc-thai',
  THONG_TIN_NUOC_THAI_QUERY: '/api/thong-tin-nuoc-thai?page={0}&limit={1}{2}',
  THONG_TIN_NUOC_THAI_ID: '/api/thong-tin-nuoc-thai/{0}',

  THONG_TIN_KHI_THAI: '/api/thong-tin-khi-thai',
  THONG_TIN_KHI_THAI_QUERY: '/api/thong-tin-khi-thai?page={0}&limit={1}{2}',
  THONG_TIN_KHI_THAI_ID: '/api/thong-tin-khi-thai/{0}',

  NGUYEN_VAT_LIEU: '/api/nguyen-vat-lieu',
  NGUYEN_VAT_LIEU_QUERY: '/api/nguyen-vat-lieu?page={0}&limit={1}{2}',
  NGUYEN_VAT_LIEU_ID: '/api/nguyen-vat-lieu/{0}',

  HOA_CHAT: '/api/hoa-chat',
  HOA_CHAT_QUERY: '/api/hoa-chat?page={0}&limit={1}{2}',
  HOA_CHAT_ID: '/api/hoa-chat/{0}',

  NHIEN_LIEU: '/api/nhien-lieu',
  NHIEN_LIEU_QUERY: '/api/nhien-lieu?page={0}&limit={1}{2}',
  NHIEN_LIEU_ID: '/api/nhien-lieu/{0}',

  QUY_MO_CHAN_NUOI_ID: '/api/quy-mo-chan-nuoi/{0}',
  QUY_MO_CHAN_NUOI_ADD: '/api/quy-mo-chan-nuoi',

  THONG_TIN_DU_AN_ID: '/api/thong-tin-du-an/{0}',
  THONG_TIN_DU_AN_ADD: '/api/thong-tin-du-an',

  HO_SO_MOI_TRUONG_ID: '/api/ho-so-moi-truong/{0}',
  HO_SO_MOI_TRUONG_ADD: '/api/ho-so-moi-truong',

  KET_LUAN_THANH_TRA: '/api/ket-luan-thanh-tra',
  KET_LUAN_THANH_TRA_QUERY: '/api/ket-luan-thanh-tra?page={0}&limit={1}{2}',
  KET_LUAN_THANH_TRA_ID: '/api/ket-luan-thanh-tra/{0}',

  THONG_TIN_HOAT_DONG: '/api/thong-tin-hoat-dong',

};
