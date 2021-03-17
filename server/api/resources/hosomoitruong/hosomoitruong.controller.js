import hosomoitruongService from './hosomoitruong.service';
import HoSoMoiTruong from './hosomoitruong.model';
import PhieuDieuTra from '../phieudieutra/phieudieutra.model';
import * as responseAction from '../../utils/responseAction';

export default {
  async create(req, res) {
    try {
      const { value, error } = hosomoitruongService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }

      // thông tin phiếu điều tra.
      let phieudieutra = await PhieuDieuTra.findById(value.phieudieutra_id);
      if (!phieudieutra) {
        return res.status(400).json({sucess: false, message: 'Phiếu điều tra không tồn tại.'});
      }
      value.loaiphieu_id = phieudieutra.loaiphieu_id

      // kiểm tra xem phiếu đã có dữ liệu quy mô chăn nuôi chưa, có rồi thì k cho thêm mới.
      let hosomoitruong = await HoSoMoiTruong.findOne({phieudieutra_id: value.phieudieutra_id, is_deleted: false})
      if(hosomoitruong){
        return res.status(400).json({sucess: false, message: 'Phiếu điều tra đã có dữ liệu quy mô chăn nuôi.'});
      }
      let data = await HoSoMoiTruong.create(value);
      return res.json(data);
    } catch (err) {
      return responseAction.error(res, 500, err.errors)
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await HoSoMoiTruong.findOne({is_deleted: false, _id: id});
      if (!data) {
        return responseAction.error(res, 404, '')
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
      const { value, error } = hosomoitruongService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await HoSoMoiTruong.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!data) {
        return  responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return responseAction.error(res, 500, err.errors)
    }
  },
};
