export const API = {
  FILE: '/api/files',

  LOGIN: '/api/users/login',

  USER_INFO: '/api/users/me',
  USER: '/api/users',
  USER_QUERY: '/api/users?page={0}&limit={1}{2}',
  USER_ID: '/api/users/{0}',

  CAU_HOI: '/api/cau-hoi-thuong-gap',
  CAU_HOI_QUERY: '/api/cau-hoi-thuong-gap?page={0}&limit={1}{2}',
  CAU_HOI_ID: '/api/cau-hoi-thuong-gap/{0}',

  HUONGDAN: '/api/huongdan',
  HUONGDAN_QUERY: '/api/huongdan?page={0}&limit={1}{2}',
  HUONGDAN_ID: '/api/huongdan/{0}',

  DANHMUC_HUONGDAN: '/api/danh-muc-huong-dan',
  DANHMUC_HUONGDAN_QUERY: '/api/danh-muc-huong-dan?page={0}&limit={1}{2}',
  DANHMUC_HUONGDAN_ID: '/api/danh-muc-huong-dan/{0}',

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

  DON_VI_TINH: '/api/don-vi-tinh',
  DON_VI_TINH_QUERY: '/api/don-vi-tinh?page={0}&limit={1}{2}',
  DON_VI_TINH_ID: '/api/don-vi-tinh/{0}',

  MUC_THANH_VIEN: '/api/muc-thanh-vien',
  MUC_THANH_VIEN_QUERY: '/api/muc-thanh-vien?page={0}&limit={1}{2}',
  MUC_THANH_VIEN_ID: '/api/muc-thanh-vien/{0}',

  VOUCHER: '/api/voucher',
  VOUCHER_QUERY: '/api/voucher?page={0}&limit={1}{2}',
  VOUCHER_ID: '/api/voucher/{0}',

  TRANG_THAI_VOUCHER: '/api/trang-thai-voucher',
  TRANG_THAI_VOUCHER_QUERY: '/api/trang-thai-voucher?page={0}&limit={1}{2}',
  TRANG_THAI_VOUCHER_ID: '/api/trang-thai-voucher/{0}',


  SOLO: '/api/solo',
  SOLO_QUERY: '/api/solo?page={0}&limit={1}{2}',
  SOLO_ID: '/api/solo/{0}',

  TRANG_THAI_SOLO: '/api/trang-thai-solo',
  TRANG_THAI_SOLO_QUERY: '/api/trang-thai-solo?page={0}&limit={1}{2}',
  TRANG_THAI_SOLO_ID: '/api/trang-thai-solo/{0}',

  FNB: '/api/fnb',
  FNB_QUERY: '/api/fnb?page={0}&limit={1}{2}',
  FNB_ID: '/api/fnb/{0}',

  TRANG_THAI_FNB: '/api/trang-thai-fnb',
  TRANG_THAI_FNB_QUERY: '/api/trang-thai-fnb?page={0}&limit={1}{2}',
  TRANG_THAI_FNB_ID: '/api/trang-thai-fnb/{0}',

  CADDY: '/api/caddy',
  CADDY_QUERY: '/api/caddy?page={0}&limit={1}{2}',
  CADDY_ID: '/api/caddy/{0}',

  TRANG_THAI_CADDY: '/api/trang-thai-caddy',
  TRANG_THAI_CADDY_QUERY: '/api/trang-thai-caddy?page={0}&limit={1}{2}',
  TRANG_THAI_CADDY_ID: '/api/trang-thai-caddy/{0}',


  JOB: '/api/job',
  JOB_QUERY: '/api/job?page={0}&limit={1}{2}',
  JOB_ID: '/api/job/{0}',

  TRANG_THAI_JOB: '/api/trang-thai-job',
  TRANG_THAI_JOB_QUERY: '/api/trang-thai-job?page={0}&limit={1}{2}',
  TRANG_THAI_JOB_ID: '/api/trang-thai-job/{0}',

  PROSHOP: '/api/proshop',
  PROSHOP_QUERY: '/api/proshop?page={0}&limit={1}{2}',
  PROSHOP_ID: '/api/proshop/{0}',

  DM_PROSHOP: '/api/dm_proshop',
  DM_PROSHOP_QUERY: '/api/dm_proshop?page={0}&limit={1}{2}',
  DM_PROSHOP_ID: '/api/dm_proshop/{0}',

  TRANG_THAI: '/api/trang-thai',
  TRANG_THAI_QUERY: '/api/trang-thai?page={0}&limit={1}{2}',
  TRANG_THAI_ID: '/api/trang-thai/{0}',

  DANHMUC_TINTUC: '/api/danhmuc-tin-tuc',
  DANHMUC_TINTUC_QUERY: '/api/danhmuc-tin-tuc?page={0}&limit={1}{2}',
  DANHMUC_TINTUC_ID: '/api/danhmuc-tin-tuc/{0}',

  TINTUC: '/api/tin-tuc',
  TINTUC_QUERY: '/api/tin-tuc?page={0}&limit={1}{2}',
  TINTUC_ID: '/api/tin-tuc/{0}',

  THONG_TIN_HOAT_DONG: '/api/thong-tin-hoat-dong',
  FILES: '/api/files/{0}',
  // FILE: '/api/files',

  THONGBAOCHUNG: '/api/thong-bao-chung',
  THONGBAOCHUNG_QUERY: '/api/thong-bao-chung?{0}',
  THONGBAOCHUNG_ID: '/api/thong-bao-chung/{0}',

  //đánh giá dịch vụ

  DANH_GIA_DICH_VU: '/api/danh-gia-dich-vu',
  DANH_GIA_DICH_VU_ID: '/api/danh-gia-dich-vu/{0}',
  DANH_GIA_DICH_VU_QUERY: '/api/danh-gia-dich-vu?page={0}&limit={1}{2}',

  DANH_GIA_DICH_VU_SAN_GOLF: '/api/danh-gia-dich-vu-san-golf',
  DANH_GIA_DICH_VU_SAN_GOLF_ID: '/api/danh-gia-dich-vu-san-golf/{0}',
  DANH_GIA_DICH_VU_SAN_GOLF_QUERY: '/api/danh-gia-dich-vu-san-golf?page={0}&limit={1}{2}',

  DANH_GIA_DICH_VU_CADDY: '/api/danh-gia-dich-vu/',
  DANH_GIA_DICH_VU_CADDY_QUERY: '/api/danh-gia-dich-vu/thong-ke?{0}',
  DANH_GIA_DICH_VU_CADDY_ID: '/api/danh-gia-dich-vu/{0}',

  DANH_GIA_DICH_VU_SANGOLF_QUERY: '/api/danh-gia-dich-vu-san-golf/thong-ke?{0}',


  DANHMUC_DANHGIA: '/api/dmdanhgia',
  DANHMUC_DANHGIA_QUERY: '/api/dmdanhgia?page={0}&limit={1}{2}',
  DANHMUC_DANHGIA_ID: '/api/dmdanhgia/{0}',

  DANHMUC_PHONG: '/api/dmphong',
  DANHMUC_PHONG_QUERY: '/api/dmphong?page={0}&limit={1}{2}',
  DANHMUC_PHONG_ID: '/api/dmphong/{0}',

  DANHMUC_NHANVIEN: '/api/dmnhanvien',
  DANHMUC_NHANVIEN_QUERY: '/api/dmnhanvien?page={0}&limit={1}{2}',
  DANHMUC_NHANVIEN_ID: '/api/dmnhanvien/{0}',


  //Danh mục dịch vụ
  DANHMUC_DICHVU: '/api/dmdichvu',
  DANHMUC_DICHVU_QUERY: '/api/dmdichvu?page={0}&limit={1}{2}',
  DANHMUC_DICHVU_ID: '/api/dmdichvu/{0}',

  THONG_TIN_CHUNG: '/api/thong-tin-chung',
  THONG_TIN_CHUNG_ID: '/api/thong-tin-chung/{0}',
  THONG_TIN_CHUNG_QUERY: '/api/thong-tin-chung?{0}',
  THONG_TIN_CHUNG_UPDATE_LOGO: '/api/thong-tin-chung/logo',

  //Thông tin ứng dụng
  THONG_TIN_UNG_DUNG: '/api/thong-tin-ung-dung',
  THONG_TIN_UNG_DUNG_ID: '/api/thong-tin-ung-dung/page={0}&limit={1}{2}',
  THONG_TIN_UNG_DUNG_QUERY: '/api/thong-tin-ung-dung?{0}',

  LICH_LAM_VIEC_CADDY: '/api/lich-lam-viec-caddy',
  LICH_LAM_VIEC_CADDY_QUERY: '/api/lich-lam-viec-caddy?page={0}&limit={1}{2}',
  LICH_LAM_VIEC_CADDY_ID: '/api/lich-lam-viec-caddy/{0}',

  LICH_SAN_GOLF: '/api/lich-san-golf',
  LICH_SAN_GOLF_QUERY: '/api/lich-san-golf?page={0}&limit={1}{2}',
  LICH_SAN_GOLF_ID: '/api/lich-san-golf/{0}',

  KHUNG_GIO_SAN_GOLF: '/api/khung-gio-san-golf',
  KHUNG_GIO_SAN_GOLF_QUERY: '/api/khung-gio-san-golf?page={0}&limit={1}{2}',
  KHUNG_GIO_SAN_GOLF_ID: '/api/khung-gio-san-golf/{0}',

  LICH_HEN: '/api/lich-hen',
  LICH_HEN_QUERY: '/api/lich-hen?page={0}&limit={1}{2}',
  LICH_HEN_ID: '/api/lich-hen/{0}',


};
