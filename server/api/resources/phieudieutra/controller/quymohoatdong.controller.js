import QuyMoHoatDong from '../../thongtinhoatdong/quymohoatdong/quymohoatdong.model';
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
        if(!curr.sanpham_id && !curr.loaihoatdong_id ){
          isCheck = false
        }
        curr.phieudieutra_id = id;
        curr.loaiphieu_id = data.loaiphieu_id;
        curr.user_id = req.user._id;
        return curr
      });
      dscapnhat = dscapnhat.map(curr => {
        if(!curr.sanpham_id && !curr.loaihoatdong_id){
          isCheck = false
        }
        curr.user_id = req.user._id;
        return curr
      })
      if(!isCheck){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }
      // tạo mới.
      let dataAdd = await QuyMoHoatDong.create(dsthemmoi);

      // cập nhật.
      let promissUpt = dscapnhat.map(data => {
        return QuyMoHoatDong.findByIdAndUpdate(data._id, data, {new: true});
      });

      await Promise.all(promissUpt);

      let quymo = await QuyMoHoatDong.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'congnghesx_id', select: 'tencongnghesx'})
        .populate({path: 'loaihoatdong_id', select: 'tenloaihoatdong'})
        .populate({path: 'sanpham_id', select: 'tensanpham'});
      return res.json(quymo);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async getDsQuyMoHoatDong(req, res) {
    try {
      let { id } = req.params;
      let data = await QuyMoHoatDong.find({ phieudieutra_id: id, is_deleted: false })
        .populate({path: 'congnghesx_id', select: 'tencongnghesx'})
        .populate({path: 'loaihoatdong_id', select: 'tenloaihoatdong'})
        .populate({path: 'sanpham_id', select: 'tensanpham'});
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
