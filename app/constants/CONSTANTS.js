const PAGINATION_CONFIG_INIT = {
  showSizeChanger: true,
  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total}`,
  size:"small",
};

export const CONSTANTS = {
  TIME_OUT: 60000,

  INPUT: 'INPUT',
  PASSWORD: 'PASSWORD',
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  SELECT: 'SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  DATE: 'DATE',

  TEXT_AREA: 'TEXT_AREA',


  MALE: 'MALE',
  FEMALE: 'FEMALE',
  ALL: 'ALL',
  ADMIN: 'ADMIN',
  MANAGE: 'QUAN_LY',
  DOCTOR: 'BAC_SY',
  ADMINISTRATOR: 'ADMINISTRATOR',

  DOWNLOAD: 'DOWNLOAD',
  PRINT: 'PRINT',
  EXPORT: 'EXPORT',
};


export const RULE = {
  REQUIRED: { required: true, message: 'Không được để trống' },
  NUMBER: {  pattern: '^[0-9]+$', message: 'Không phải là số' },
  PHONE: { pattern: '^[0-9]+$', len: 10, message: 'Số điện thoại không hợp lệ' },
  EMAIL: { type: 'email', message: 'Email không hợp lệ' },
  NUMBER_FLOAT: {
    pattern: new RegExp("^[- +]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$"),
    message: "Không phải là số"
  }
};
export const PAGINATION_CONFIG = Object.assign({}, PAGINATION_CONFIG_INIT)

export const GENDER_OPTIONS = [
  { value: CONSTANTS.MALE, label: 'Nam' },
  { value: CONSTANTS.FEMALE, label: 'Nữ' },
];

export const DISEASE_GENDER_OPTIONS = [
  { value: CONSTANTS.MALE, label: 'Nam' },
  { value: CONSTANTS.FEMALE, label: 'Nữ' },
  { value: CONSTANTS.ALL, label: 'Tất cả' },
];

export const ROLE_OPTIONS = [
  { value: CONSTANTS.ADMIN, label: 'Quản trị hệ thống' },
  { value: CONSTANTS.MANAGE, label: 'Quản lý' },
];

export const THONG_TIN_DON_VI = [
  { value: 'TENCOSO', label: 'Tên cơ sở' },
  { value: 'CHUNGUONTHAI', label: 'Chủ nguồn thải' },
  { value: 'DIACHITRUSO', label: 'Địa chỉ trụ sở' },
  { value: 'DIACHIHOATDONG', label: 'Địa chỉ hoạt động' },
  { value: 'TOADO', label: 'Tọa độ' },
  { value: 'NGUOIDAIDIEN', label: 'Người đại diện' },
  { value: 'NAMHOATDONG', label: 'Năm hoạt động' },
  { value: 'DIENTICH', label: 'Diện tích mặt bằng' },
  { value: 'SONHANVIEN', label: 'Tổng số nhân viên' },
  { value: 'WEBSITE', label: 'Địa chỉ website' },
  { value: 'THUOCKKT', label: 'Thuộc KKT/KCN/CCN' },
  { value: 'LOAIHINHXULY', label: 'Loại hình thực hiện xử lý' },
  { value: 'LOAIHINHKINHTE', label: 'Loại hình kinh tế của bệnh viện' },
  { value: 'NGHEUUTIEN', label: 'Nghành nghề ưu tiên' },
  { value: 'LANGNGHE', label: 'Làng nghề' },
  { value: 'XEPHANGCOSO', label: 'Xếp hạng cơ sở y tế/bệnh viện' }
];

export const LOAI_HINH_XU_LY = [
  { value: '1', label: 'CTR sinh hoạt' },
  { value: '2', label: 'CTR công nghiệp' },
  { value: '3', label: 'Nước thải sinh hoạt' },
  { value: '4', label: 'Nước thải công nghiệp' },
  { value: '5', label: 'Chất thải nguy hại' }
];

export const LOAI_HINH_KINH_TE = [
  { value: '1', label: 'Công lập' },
  { value: '2', label: 'Tư nhân' }
];

export const XEP_HANG_CO_SO = [
  { value: '1', label: 'Trực thuộc Bộ Y tế' },
  { value: '2', label: 'Thuộc các Bộ ngành khác' },
  { value: '3', label: 'Thuộc địa phương quản lý' },
  { value: '4', label: 'Trung tâm y tế' }
];

export const THONG_TIN_CHAT_THAI = [
  { value: 'CHATTHAIRANSINHHOAT', label: 'Chất thải rắn sinh hoạt' },
  { value: 'CHATTHAIRANCONGNGHIEP', label: 'Chất thải rắn công nghiệp' },
  { value: 'CHATTHAINGUYHAI', label: 'Chất thải nguy hại' },
  { value: 'CHATTHAIRANYTEKONGUYHAI', label: 'Chất thải rắn y tế không nguy hại' },
  { value: 'CHATTHAIRANSANXUAT', label: 'Chất thải rắn sản xuất' },
  { value: 'CHATTHAIRANCHANNUOI', label: 'Chất thải rắn chăn nuôi' },
  { value: 'CHATTHAIYTENGUYHAI', label: 'Chất thải y tế nguy hại' },
  { value: 'CHATTHAINGUYHAICOSOXULY', label: 'Chất thải nguy hại cơ sở xử lý' },
  { value: 'CHATTHAINGUYHAIBANQUANLY', label: 'Chất thải nguy hại ban quản lý KCN' },
  { value: 'XULYNUOCTHAI', label: 'Xử lý nước thải' },
  { value: 'NUOCTHAI', label: 'Nước thải' },
  { value: 'KHITHAI', label: 'Khí thải' },
  { value: 'NUOCTHAICHANNUOI', label: 'Nước thải chăn nuôi' },
  { value: 'NUOCTHAICSKHAITHACMO', label: 'Nước thải cơ sở khai thác mỏ' },
  { value: 'NUOCTHAILANGNGHE', label: 'Nước thải các làng nghề' },
  { value: 'NUOCTHAICOSOXULY', label: 'Nước thải cơ sở xử lý' },
  { value: 'NUOCTHAICOSOYTE', label: 'Nước thải cơ sở y tế' },
  { value: 'CHATTHAIRANSHCOSOXULY', label: 'Chất thải rắn sinh hoạt cơ sở xử lý' },
  { value: 'CHATTHAIRANCNCOSOXULY', label: 'Chất thải rắn công nghiệp cơ sở xử lý' },
  { value: 'KHITHAICOSOKHAITHACMO', label: 'Khí thải cơ sở khai thác mỏ' },
  { value: 'KHITHAILANGNGHE', label: 'Khí thải các làng nghề' },

];

export const HOAT_DONG_DON_VI = [
  { value: 'QUYMOHOATDONG', label: 'Quy mô hoạt động' },
  { value: 'QUYMOHOATDONGCOSOXULY', label: 'Quy mô hoạt động cơ sở xử lý' },
  { value: 'QUYMOCHANNUOI', label: 'Quy mô chăn nuôi' },
  { value: 'QUYMOBENHVIEN', label: 'Quy mô bệnh viện' },
  { value: 'NGUYENVATLIEU', label: 'Các nguyên, vật liệu sử dụng chính' },
  { value: 'HOACHAT', label: 'Hoá chất sử dụng chính' },
  { value: 'NHIENLIEUTIEUTHU', label: 'Nhiên liệu tiêu thụ' },
  { value: 'LUONGNUOC', label: 'Lượng nước sử dụng' },
  { value: 'THONGTINDUAN', label: 'Thông tin dự án KKT, KCN, CCN' }
];

export const KET_LUAN_THANH_TRA = [
  { value: 'CHUNG', label: 'Kết luận thanh tra chung' },
  { value: 'COSOYTE', label: 'Kết luận thanh tra cơ sở y tế' },
  { value: 'COSOCHANNUOI', label: 'Kết luận thanh tra cơ sở chăn nuôi' },
  { value: 'COSOXULY', label: 'Kết luận thanh tra cơ sở xử lý' },
  { value: 'BANQUANLY', label: 'Kết luận thanh tra ban quản lý' },
  { value: 'LANGNGHE', label: 'Kết luận thanh tra làng nghề' },
];


export const QUY_MO_CHAN_NUOI = [
  { key: '1', loaihinhchannuoi: 'Đại gia súc (trâu, bò, ngựa)', soluong: '', ghichu: '', daigiasuc_soluong: '', daigiasuc_ghichu: '', key_soluong: 'daigiasuc_soluong', key_ghighu: 'daigiasuc_ghichu'  },
  { key: '2', loaihinhchannuoi: 'Tiểu gia súc (lợn, chó, mèo, động vật hoang dã)', soluong: '', ghichu: '', tieugiasuc_soluong: '', tieugiasuc_ghichu: '', key_soluong: 'tieugiasuc_soluong', key_ghighu: 'tieugiasuc_ghichu' },
  { key: '3', loaihinhchannuoi: 'Gia cầm (gà, chim)', soluong: '', ghichu: '', giacam_soluong: '', giacam_ghichu: '', key_soluong: 'giacam_soluong', key_ghighu: 'giacam_ghichu' },
  { key: '4', loaihinhchannuoi: 'Thủy cầm (vịt, ngan, ngỗng)', soluong: '', ghichu: '', thuycam_soluong: '', thuycam_ghichu: '', key_soluong: 'thuycam_soluong', key_ghighu: 'thuycam_ghichu' },
  { key: '5', loaihinhchannuoi: 'Các loại vật nuôi khác', soluong: '', ghichu: '', vatnuoikhac_soluong: '', vatnuoikhac_ghichu: '', key_soluong: 'vatnuoikhac_soluong', key_ghighu: 'vatnuoikhac_ghichu' }
];

export const QUY_MO_BENH_VIEN = [
  { key: '1', quymobenhvien: 'Số lượng Phòng, khoa', soluong: '', phongkhoa_soluong: '', key_soluong: 'phongkhoa_soluong' },
  { key: '2', quymobenhvien: 'Số lượng bác sĩ', soluong: '', bacsy_soluong: '',  key_soluong: 'bacsy_soluong' },
  { key: '3', quymobenhvien: 'Số lượng y tá', soluong: '', yta_soluong: '', key_soluong: 'yta_soluong' },
  { key: '4', quymobenhvien: 'Số lượng giường bệnh', soluong: '', giuongbenh_soluong: '', key_soluong: 'giuongbenh_soluong'},
];

export const HO_SO_MOI_TRUONG = [
  { 
    key: '1', 
    stt:'1',
    hosomoitruong: 'Quyết định phê duyệt ĐTM/Kế hoạch BVMT/Bổ sung phê duyệt ĐTM',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    quyetdinhpheduyet_soqd: '', 
    quyetdinhpheduyet_coquan: '', 
    quyetdinhpheduyet_thoigian:'',
    quyetdinhpheduyet_ghichu:'',
    key_soqd: 'quyetdinhpheduyet_soqd' ,
    key_coquan: 'quyetdinhpheduyet_coquan' ,
    key_thoigian: 'quyetdinhpheduyet_thoigian' ,
    key_ghichu: 'quyetdinhpheduyet_ghichu' 
  },
  { 
    key: '2', 
    stt:'2',
    hosomoitruong: 'Xác nhận hoàn thành công trình bảo vệ môi trường',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    xacnhanhoanthanh_soqd: '', 
    xacnhanhoanthanh_coquan: '', 
    xacnhanhoanthanh_thoigian:'',
    xacnhanhoanthanh_ghichu:'',
    key_soqd: 'xacnhanhoanthanh_soqd' ,
    key_coquan: 'xacnhanhoanthanh_coquan' ,
    key_thoigian: 'xacnhanhoanthanh_thoigian' ,
    key_ghichu: 'xacnhanhoanthanh_ghichu' 
  },
  { 
    key: '3', 
    stt:'3',
    hosomoitruong: 'Thuộc danh mục kiểm soát của cơ quan quản lý nhà nước về BVMT',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    danhmuckiemsoat_soqd: '', 
    danhmuckiemsoat_coquan: '', 
    danhmuckiemsoat_thoigian:'',
    danhmuckiemsoat_ghichu:'',
    key_soqd: 'danhmuckiemsoat_soqd' ,
    key_coquan: 'danhmuckiemsoat_coquan' ,
    key_thoigian: 'danhmuckiemsoat_thoigian' ,
    key_ghichu: 'danhmuckiemsoat_ghichu' 
  },
  { 
    key: '4', 
    stt:'3.1',
    hosomoitruong: 'Thuộc danh mục các cơ sở có tên trong Đề án Kiểm soát đặc biệt cơ sở có nguy cơ gây ô nhiễm môi trường cao',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    dmcsonhiemcao_soqd: '', 
    dmcsonhiemcao_coquan: '', 
    dmcsonhiemcao_thoigian:'',
    dmcsonhiemcao_ghichu:'',
    key_soqd: 'dmcsonhiemcao_soqd' ,
    key_coquan: 'dmcsonhiemcao_coquan' ,
    key_thoigian: 'dmcsonhiemcao_thoigian' ,
    key_ghichu: 'dmcsonhiemcao_ghichu' 
  },
  { 
    key: '5', 
    stt:'-',
    hosomoitruong: 'Quyết định đưa vào danh mục',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    qddmmonhiemcao_soqd: '', 
    qddmmonhiemcao_coquan: '', 
    qddmmonhiemcao_thoigian:'',
    qddmmonhiemcao_ghichu:'',
    key_soqd: 'qddmmonhiemcao_soqd' ,
    key_coquan: 'qddmmonhiemcao_coquan' ,
    key_thoigian: 'qddmmonhiemcao_thoigian' ,
    key_ghichu: 'qddmmonhiemcao_ghichu' 
  },

  { 
    key: '6', 
    stt:'-',
    hosomoitruong: 'Quyết định xác nhận hoàn thành các biện pháp bảo vệ môi trường theo yêu cầu',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    qdxnonhiemcao_soqd: '', 
    qdxnonhiemcao_coquan: '', 
    qdxnonhiemcao_thoigian:'',
    qdxnonhiemcao_ghichu:'',
    key_soqd: 'qdxnonhiemcao_soqd' ,
    key_coquan: 'qdxnonhiemcao_coquan' ,
    key_thoigian: 'qdxnonhiemcao_thoigian' ,
    key_ghichu: 'qdxnonhiemcao_ghichu' 
  },
  { 
    key: '7', 
    stt:'3.2',
    hosomoitruong: 'Thuộc danh mục các cơ sở gây ô nhiễm môi trường nghiêm trọng',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    dmcsonhiemnt_soqd: '', 
    dmcsonhiemnt_coquan: '', 
    dmcsonhiemnt_thoigian:'',
    dmcsonhiemnt_ghichu:'',
    key_soqd: 'dmcsonhiemnt_soqd' ,
    key_coquan: 'dmcsonhiemnt_coquan' ,
    key_thoigian: 'dmcsonhiemnt_thoigian' ,
    key_ghichu: 'dmcsonhiemnt_ghichu' 
  },
  { 
    key: '8', 
    stt:'-',
    hosomoitruong: 'Quyết định đưa vào danh mục',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    qddmonhiemnt_soqd: '', 
    qddmonhiemnt_coquan: '', 
    qddmonhiemnt_thoigian:'',
    qddmonhiemnt_ghichu:'',
    key_soqd: 'qddmonhiemnt_soqd' ,
    key_coquan: 'qddmonhiemnt_coquan' ,
    key_thoigian: 'qddmonhiemnt_thoigian' ,
    key_ghichu: 'qddmonhiemnt_ghichu' 
  },
  { 
    key: '9', 
    stt:'-',
    hosomoitruong: 'Quyết định xác nhận hoàn thành các biện pháp bảo vệ môi trường theo yêu cầu',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    qdxnonhiemnt_soqd: '', 
    qdxnonhiemnt_coquan: '', 
    qdxnonhiemnt_thoigian:'',
    qdxnonhiemnt_ghichu:'',
    key_soqd: 'qdxnonhiemnt_soqd' ,
    key_coquan: 'qdxnonhiemnt_coquan' ,
    key_thoigian: 'qdxnonhiemnt_thoigian' ,
    key_ghichu: 'qdxnonhiemnt_ghichu' 
  },
  { 
    key: '10', 
    stt:'4',
    hosomoitruong: 'Quyết định đưa vào danh mục',
    soqd: '',
    coquan:'',
    thoigian:'',
    ghichu:'', 
    giayphepxathai_soqd: '', 
    giayphepxathai_coquan: '', 
    giayphepxathai_thoigian:'',
    giayphepxathai_ghichu:'',
    key_soqd: 'giayphepxathai_soqd' ,
    key_coquan: 'giayphepxathai_coquan' ,
    key_thoigian: 'giayphepxathai_thoigian' ,
    key_ghichu: 'giayphepxathai_ghichu' 
  },
];

export const HANH_VI_VI_PHAM = [
  { value: '1', label: 'Khí thải' },
  { value: '2', label: 'Nước thải' },
  { value: '3', label: 'CTR sinh hoạt' },
  { value: '4', label: 'CTR công nghiệp' },
  { value: '5', label: 'CTR nguy hại nguy hại' },
  { value: '6', label: 'CTR y tế thông thường' },
  { value: '7', label: 'CT nguy hại' },
  { value: '8', label: 'CTR rắn chăn nuôi' },
  { value: '9', label: 'CTR sản xuất' },
];


