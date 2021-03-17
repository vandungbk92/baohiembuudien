import { QUY_MO_CHAN_NUOI } from '@constants';

export function getDataSource(data) {
  let dataSource = QUY_MO_CHAN_NUOI.map(curr => {
    curr.soluong = data[curr.key_soluong];
    curr.ghichu = data[curr.key_ghighu];
    curr[curr.key_soluong] = data[curr.key_soluong];
    curr[curr.key_ghighu] = data[curr.key_ghighu];
    return curr;
  });
  return dataSource
}

export function getDataSave(dataSource) {
  let dataSave = {
    daigiasuc_soluong: dataSource[0].daigiasuc_soluong,
    daigiasuc_ghichu: dataSource[0].daigiasuc_ghichu,

    tieugiasuc_soluong: dataSource[1].tieugiasuc_soluong,
    tieugiasuc_ghichu: dataSource[1].tieugiasuc_ghichu,

    giacam_soluong: dataSource[2].giacam_soluong,
    giacam_ghichu: dataSource[2].giacam_ghichu,

    thuycam_soluong: dataSource[3].thuycam_soluong,
    thuycam_ghichu: dataSource[3].thuycam_ghichu,

    vatnuoikhac_soluong: dataSource[4].vatnuoikhac_soluong,
    vatnuoikhac_ghichu: dataSource[4].vatnuoikhac_ghichu
  }
  return dataSave
}
