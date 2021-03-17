import NguyenVatLieu from '../../thongtinhoatdong/nguyenvatlieu/nguyenvatlieu.model';
import * as responseAction from '../../../utils/responseAction'
import PhieuDieuTra from '../phieudieutra.model';

export default {
  async create(req, res) {
    try {
      const { id } = req.params;
      const data = await PhieuDieuTra.findById({ is_deleted: false, _id: id })
      if (!data) {
        return responseAction.error(res, 404, '');
      }
      let {dsthemmoi, dscapnhat} = req.body;

      if(!Array.isArray(dsthemmoi) || !Array.isArray(dscapnhat)){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }

      // kiểm tra dữ liệu.
      let isCheck = true;
      dsthemmoi = dsthemmoi.map(curr => {
        if(!curr.nguyenvatlieu_id){
          isCheck = false
        }
        curr.phieudieutra_id = id;
        curr.loaiphieu_id = data.loaiphieu_id;
        return curr
      });
      dscapnhat.forEach(curr => {
        if(!curr.nguyenvatlieu_id){
          isCheck = false
        }
      })
      if(!isCheck){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }
      // tạo mới.
      let dataAdd = await NguyenVatLieu.create(dsthemmoi);

      // cập nhật.
      let promissUpt = dscapnhat.map(data => {
        return NguyenVatLieu.findByIdAndUpdate(data._id, data, {new: true});
      });

      await Promise.all(promissUpt);

      let quymo = await NguyenVatLieu.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'donvi_id', select: 'tendonvi'})
        .populate({path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu'});
      return res.json(quymo);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async getDsNguyenVatLieu(req, res) {
    try {
      let { id } = req.params;
      let data = await NguyenVatLieu.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'donvi_id', select: 'tendonvi'})
        .populate({path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu'});
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
