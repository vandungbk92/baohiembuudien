import phieudieutraService from './phieudieutra.service';
import PhieuDieuTra from './phieudieutra.model';
import DonViDuocDieuTra from '../donviduocdieutra/donviduocdieutra.model';
import QuyMoHoatDong from '../thongtinhoatdong/quymohoatdong/quymohoatdong.model';
import * as responseAction from '../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';
import { select } from 'redux-saga/effects';

export default {
  async create(req, res) {
    try {
      const { value, error } = phieudieutraService.validateBody(req.body, 'POST');
      value.user_id = req.user._id
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0]);
      }
      // nếu không có đơn vị được điều tra, thì thêm mới đơn vị được điều tra.
      if (!value.donviduocdieutra_id) {
        let donvidieutra = await DonViDuocDieuTra.create(value);
        value.donviduocdieutra_id = donvidieutra._id;
      }
      const data = await PhieuDieuTra.create(value);
      let dataRtn = await data.populate({ path: 'loaiphieu_id', select: 'tenphieu link' }).execPopulate();
      return res.json(dataRtn);
    } catch (err) {
      responseAction.error(res, 500, err.errors);
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true);
      if (req.query.limit && req.query.limit === '0') {
        const totalQuery = await PhieuDieuTra.paginate(query, { limit: 0 });
        req.query.limit = totalQuery.total;
      }
      let options = optionsRequest(req.query);
      options.populate = [
        { path: 'loaiphieu_id', select: 'tenphieu link' },
        { path: 'tinhthanhhoatdong_id', select: 'tentinh' },
        { path: 'quanhuyenhoatdong_id', select: 'tenqh' },
        { path: 'phuongxahoatdong_id', select: 'tenphuongxa'}
      ];
      
      options.sort = { tencoso: 1 };
      const data = await PhieuDieuTra.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findALLByLoaiPhieu(req, res) {
    try {
      let { id } = req.params;
      let phieudieutra = await PhieuDieuTra.find({ loaiphieu_id: id, is_deleted: false })
        .populate({ path: 'loaiphieu_id', select: 'tenphieu' });
      return res.json(phieudieutra);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await PhieuDieuTra.findOne({ is_deleted: false, _id: id })
        .populate({ path: 'loaiphieu_id', select: 'tenphieu link thongtindonvi thongtinchatthai hoatdongdonvi label_hoatdong ketluanthanhtra' })
        .populate({ path: 'tinhthanhhoatdong_id' })
        .populate({ path: 'quanhuyenhoatdong_id' })
        .populate({ path: 'phuongxahoatdong_id' })
        .populate({ path: 'tinhthanhtruso_id' })
        .populate({ path: 'quanhuyentruso_id' })
        .populate({ path: 'phuongxatruso_id' });

      if (!data) {
        return responseAction.error(res, 404, '');
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const data = await PhieuDieuTra.findOneAndUpdate({ _id: id }, { is_deleted: true }, { new: true });

      if (!data) {
        responseAction.error(res, 404, '');
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { value, error } = phieudieutraService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0]);
      }
      const data = await PhieuDieuTra.findOneAndUpdate({ _id: id }, value, { new: true })
        .populate({ path: 'loaiphieu_id', select: 'tenphieu link thongtindonvi' })
        .populate({ path: 'tinhthanhhoatdong_id' })
        .populate({ path: 'quanhuyenhoatdong_id' })
        .populate({ path: 'phuongxahoatdong_id' })
        .populate({ path: 'tinhthanhtruso_id' })
        .populate({ path: 'quanhuyentruso_id' })
        .populate({ path: 'phuongxatruso_id' });

      if (!data) {
        return responseAction.error(res, 404, '');
      }

      return res.json(data);
    } catch (err) {
      console.error(err);
      return responseAction.error(res, 500, err.errors);
    }
  }
};
