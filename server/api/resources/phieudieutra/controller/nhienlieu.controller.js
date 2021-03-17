import NhienLieu from '../../thongtinhoatdong/nhienlieu/nhienlieu.model';
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
        if(!curr.nhienlieutieuthu_id){
          isCheck = false
        }
        curr.phieudieutra_id = id;
        curr.loaiphieu_id = data.loaiphieu_id;
        return curr
      });
      dscapnhat.forEach(curr => {
        if(!curr.nhienlieutieuthu_id){
          isCheck = false
        }
      })
      if(!isCheck){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }
      // tạo mới.
      let dataAdd = await NhienLieu.create(dsthemmoi);

      // cập nhật.
      let promissUpt = dscapnhat.map(data => {
        return NhienLieu.findByIdAndUpdate(data._id, data, {new: true});
      });

      await Promise.all(promissUpt);

      let quymo = await NhienLieu.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'nhienlieutieuthu_id', select: 'loainhienlieu'});
      return res.json(quymo);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async getDsNhienLieu(req, res) {
    try {
      let { id } = req.params;
      let data = await NhienLieu.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'nhienlieutieuthu_id', select: 'loainhienlieu'});
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
