import BenhNhan from './khachhang.model';
import DangKy from '../dangky/dangky.model';
import DonThuoc from '../donthuoc/donthuoc.model';
import DonThuocCT from '../donthuocct/donthuocct.model';
import DienBien from '../dienbien/dienbien.model';
import KhamBenh from '../khambenh/khambenh.model';
import * as responseAction from '../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';
import {dsDangKyBenhNhan} from './khachhang.utils'
import {thongtindichvu} from "../dangky/dangky.utils";

export default {
  async dsDangKy(req, res){
    try {
      const { id } = req.params;
      const benhnhan = await BenhNhan.findById(id);
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }
      const dsDangKy = await dsDangKyBenhNhan(id)
      return res.json(dsDangKy);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async dsDangKyBenhNhan(req, res){
    try {
      const { _id } = req.user;
      const benhnhan = await BenhNhan.findById(_id);
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }
      const dsDangKy = await dsDangKyBenhNhan(_id)
      return res.json(dsDangKy);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async dsDonThuocBenhNhan(req, res){
    try {
      let _id = ''
      if(req.params.id) _id = req.params.id
      else _id = req.user._id
      const benhnhan = await BenhNhan.findById(_id);
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }

      // danh sách những lần đăng ký của bệnh nhân.
      let makcb = await DangKy.find({mabn: _id}).lean().distinct('_id');

      if(!makcb.length){
        return res.json([])
      }
      // danh sách các đơn thuốc của bệnh nhân.
      let donthuoc = await DonThuoc.find({makcb: {$in: makcb}})
          .populate({path: 'makhambenh', select: 'maphong', populate:{path: 'maphong', select:'tenphong'}})
          .populate({path: 'manv', select: 'tennv'})
          .sort({makhambenh: -1}).lean();
      let donthuocRtn = []
      await Promise.all(donthuoc.map(async (data, idx) => {
        let donthuocct = await DonThuocCT.find({madonthuoc: data._id}).populate({path: 'mahh', select: 'tenhh', populate: {path: 'madonvitinh', select:'tendonvitinh'}}).sort({_id: 1})
        data.donthuocct = donthuocct
        donthuocRtn[idx] = data
      }))
      return res.json(donthuocRtn);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async dsKetQuaCLSBenhNhan(req, res){
    try {
      let _id = ''
      if(req.params.id) _id = req.params.id
      else _id = req.user._id

      const benhnhan = await BenhNhan.findById(_id)
        
      if (!benhnhan) {
        return responseAction.error(res, 404, '');
      }

      // danh sách những lần đăng ký của bệnh nhân.
      let makcb = await DangKy.find({mabn: _id}).lean().distinct('_id')

      if(!makcb.length){
        return res.json([])
      }
      // 1 lần khám bệnh chỉ có 1 đơn thuốc.

      // danh sách các đơn thuốc của bệnh nhân chỉ đi vs 1 bản ghi khám bệnh.
      // 1 lần khám bệnh thì đi với nhiều dịch vụ.
      // mỗi dịch vụ lại có hoặc không có kết quả cận lâm sàng.

      // phải nhóm được mỗi lần đăng ký thì khám những khoa nào.
      // những khoa nào có cận lâm sàng thì xem kết quả khoa đó.

      // chỉ cần hiển thị khoa nào khám, và dịch vụ khoa đó.

      // -> khám bệnh -> dịch vụ -> kết quả.
      // danh sách khám bệnh của mỗi lần đăng ký.

      let dsKhamBenh = await KhamBenh.find({makcb: {$in: makcb}})
      .populate({path: "maphong", select: "tenphong"})
      .populate({path: 'mahh', select: 'tenhh'})
        .sort({makcb: -1, _id: 1})
        .lean();
      let dsKhamBenhRtn = []
      await Promise.all(dsKhamBenh.map(async (data, idx) => {
        let dichvu = await thongtindichvu(data);
        data.dichvu = dichvu
        dsKhamBenhRtn[idx] = data
      }))

      // kiểm tra dịch vụ là cận lâm sàng và có kết quả
      let arrRtn = []
      dsKhamBenhRtn.forEach(curr => {
        let dichvu = curr.dichvu;
        let dichvuAdd = dichvu.filter(data => {
          if(data.loaiketqua === 0 || data.ketquacls === null) return false
          return true
        })
        if(dichvuAdd.length){
          curr.dichvu = dichvuAdd
          arrRtn = [...arrRtn, curr]
        }
      })
      return res.json(arrRtn)

    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async dsDienBienBenhNhan(req, res){
    try {
      const { _id } = req.user;
      const benhnhan = await BenhNhan.findById(_id);
      if (!benhnhan) {
        return responseAction.error(res, 404, '');
      }

      // danh sách những lần đăng ký của bệnh nhân.
      let makcb = await DangKy.find({mabn: _id}).lean().distinct('_id');

      if(!makcb.length){
        return res.json([])
      }
      // danh sách các đơn thuốc của bệnh nhân.
      let dienbien = await DienBien.find({makcb: {$in: makcb}}).sort({ngay: -1})
        .populate({path: 'makhambenh', select: 'makk maphong ngay trieuchung chandoansobo',
        populate: [{path: 'makk', select: 'tenkk'}, {path: 'maphong', select: 'tenphong'}]});
      return res.json(dienbien);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
