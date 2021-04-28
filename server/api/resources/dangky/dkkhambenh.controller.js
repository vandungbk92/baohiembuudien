import DangKy from './dangky.model';
import KhamBenh from '../khambenh/khambenh.model';
import HenKham from '../henkham/henkham.model';

import * as responseAction from '../../utils/responseAction';
import {thongtinchandoan, thongtindienbien, thongtindonthuoc, thongtindichvu, thongtinhenkham} from './dangky.utils'

export default {
  async chitietHenKham(req, res){
    const { id } = req.params;
    const data = await DangKy.findOne({_id: id})
    if (!data) {
      return responseAction.error(res, 404, '');
    }

    let henkham = await HenKham.find({makcb: id})
      .populate({path: 'maphong', select: 'tenphong'})
      .populate({path: 'maphonghen', select: 'tenphong'})
    return res.json(henkham)
  },
  async chitietDangKy(req, res) {
    try {
      const { id } = req.params;
      const data = await DangKy.findOne({_id: id});
      if (!data) {
        return responseAction.error(res, 404, '');
      }
      // return res.json(data)
      // lấy danh sách các khoa khám bệnh của đợt đăng ký.
      let dsKhamBenh = await KhamBenh.find({makcb: id})
        .populate({path: 'manv', select: 'tennv'})
        .populate({path: 'makk', select: 'tenkk'})
        .populate({path: 'maphong', select: 'tenphong'}).sort({_id: 1}).lean()

      // danh sách diễn biến ( là các chỉ số sinh tồn ).
      let dsKhamBenhRtn = [];

      await Promise.all(dsKhamBenh.map(async (data, idx) => {
        let a = await Promise.all([thongtindichvu(data), thongtindonthuoc(data),
          thongtinchandoan(data), thongtindienbien(data)])
        data.dichvu = await a[0];
        data.donthuoc = await a[1];
        data.chandoan = await a[2];
        data.dienbien = await a[3];
        dsKhamBenhRtn[idx] = data
      }))
      return res.json(dsKhamBenhRtn)

    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
