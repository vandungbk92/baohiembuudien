import { QUY_MO_BENH_VIEN } from '@constants';

export function getDataSource(data) {
  let dataSource = QUY_MO_BENH_VIEN.map(curr => {
    curr.soluong = data[curr.key_soluong];
    curr[curr.key_soluong] = data[curr.key_soluong];
    return curr;
  });
  return dataSource
}

export function getDataSave(dataSource) {
  let dataSave = {
    phongkhoa_soluong: dataSource[0].phongkhoa_soluong,

    bacsy_soluong: dataSource[1].bacsy_soluong,

    yta_soluong: dataSource[2].yta_soluong,

    giuongbenh_soluong: dataSource[3].giuongbenh_soluong,
  }
  return dataSave
}
