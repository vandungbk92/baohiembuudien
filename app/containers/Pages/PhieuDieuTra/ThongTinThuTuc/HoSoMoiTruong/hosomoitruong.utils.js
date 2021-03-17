import { HO_SO_MOI_TRUONG } from '@constants';
import moment from 'moment';

export function getDataSource(data) {
  let a = [...HO_SO_MOI_TRUONG]
  let dataSource = a.map(curr => {
    curr.soqd = data[curr.key_soqd];
    curr.coquan = data[curr.key_coquan];
    curr.thoigian = data[curr.key_thoigian] ? moment(data[curr.key_thoigian]) :'';
    curr.ghichu = data[curr.key_ghichu];
    curr[curr.key_soqd] = data[curr.key_soqd];
    curr[curr.key_coquan] = data[curr.key_coquan];
    curr[curr.key_thoigian] = data[curr.key_thoigian];
    curr[curr.key_ghichu] = data[curr.key_ghichu];
    return curr;
  });
  return dataSource
}

export function getDataSave(dataSource) {
  let dataSave = {
    quyetdinhpheduyet_soqd: dataSource[0].quyetdinhpheduyet_soqd,
    quyetdinhpheduyet_coquan: dataSource[0].quyetdinhpheduyet_coquan,
    quyetdinhpheduyet_thoigian: dataSource[0].quyetdinhpheduyet_thoigian,
    quyetdinhpheduyet_ghichu: dataSource[0].quyetdinhpheduyet_ghichu,

    xacnhanhoanthanh_soqd: dataSource[1].xacnhanhoanthanh_soqd,
    xacnhanhoanthanh_coquan: dataSource[1].xacnhanhoanthanh_coquan,
    xacnhanhoanthanh_thoigian: dataSource[1].xacnhanhoanthanh_thoigian,
    xacnhanhoanthanh_ghichu: dataSource[1].xacnhanhoanthanh_ghichu,

    danhmuckiemsoat_soqd: dataSource[2].danhmuckiemsoat_soqd,
    danhmuckiemsoat_coquan: dataSource[2].danhmuckiemsoat_coquan,
    danhmuckiemsoat_thoigian: dataSource[2].danhmuckiemsoat_thoigian,
    danhmuckiemsoat_ghichu: dataSource[2].danhmuckiemsoat_ghichu,

    dmcsonhiemcao_soqd: dataSource[3].dmcsonhiemcao_soqd,
    dmcsonhiemcao_coquan: dataSource[3].dmcsonhiemcao_coquan,
    dmcsonhiemcao_thoigian: dataSource[3].dmcsonhiemcao_thoigian,
    dmcsonhiemcao_ghichu: dataSource[3].dmcsonhiemcao_ghichu,

    qddmmonhiemcao_soqd: dataSource[4].qddmmonhiemcao_soqd,
    qddmmonhiemcao_coquan: dataSource[4].qddmmonhiemcao_coquan,
    qddmmonhiemcao_thoigian: dataSource[4].qddmmonhiemcao_thoigian,
    qddmmonhiemcao_ghichu: dataSource[4].qddmmonhiemcao_ghichu,

    qdxnonhiemcao_soqd: dataSource[5].qdxnonhiemcao_soqd,
    qdxnonhiemcao_coquan: dataSource[5].qdxnonhiemcao_coquan,
    qdxnonhiemcao_thoigian: dataSource[5].qdxnonhiemcao_thoigian,
    qdxnonhiemcao_ghichu: dataSource[5].qdxnonhiemcao_ghichu,

    dmcsonhiemnt_soqd: dataSource[6].dmcsonhiemnt_soqd,
    dmcsonhiemnt_coquan: dataSource[6].dmcsonhiemnt_coquan,
    dmcsonhiemnt_thoigian: dataSource[6].dmcsonhiemnt_thoigian,
    dmcsonhiemnt_ghichu: dataSource[6].dmcsonhiemnt_ghichu,

    qddmonhiemnt_soqd: dataSource[7].qddmonhiemnt_soqd,
    qddmonhiemnt_coquan: dataSource[7].qddmonhiemnt_coquan,
    qddmonhiemnt_thoigian: dataSource[7].qddmonhiemnt_thoigian,
    qddmonhiemnt_ghichu: dataSource[7].qddmonhiemnt_ghichu,

    qdxnonhiemnt_soqd: dataSource[8].qdxnonhiemnt_soqd,
    qdxnonhiemnt_coquan: dataSource[8].qdxnonhiemnt_coquan,
    qdxnonhiemnt_thoigian: dataSource[8].qdxnonhiemnt_thoigian,
    qdxnonhiemnt_ghichu: dataSource[8].qdxnonhiemnt_ghichu,

    giayphepxathai_soqd: dataSource[9].giayphepxathai_soqd,
    giayphepxathai_coquan: dataSource[9].giayphepxathai_coquan,
    giayphepxathai_thoigian: dataSource[9].giayphepxathai_thoigian,
    giayphepxathai_ghichu: dataSource[9].giayphepxathai_ghichu,
  }
  return dataSave
}

export const HO_SO_MOI_TRUONG_NULL = [
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

