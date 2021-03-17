import LuongNuocSuDung from '../../thongtinhoatdong/luongnuocsudung/luongnuocsudung.model';
import * as responseAction from '../../../utils/responseAction';
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
        curr.phieudieutra_id = id;
        curr.loaiphieu_id = data.loaiphieu_id;
        curr.user_id = req.user._id;
        return curr
      });
      dscapnhat = dscapnhat.map(curr => {
        curr.user_id = req.user._id;
        return curr
      })

      // tạo mới.
      let dataAdd = await LuongNuocSuDung.create(dsthemmoi);

      // cập nhật.
      let promissUpt = dscapnhat.map(data => {
        return LuongNuocSuDung.findByIdAndUpdate(data._id, data, {new: true});
      });

      await Promise.all(promissUpt);

      let quymo = await LuongNuocSuDung.find({ phieudieutra_id: id, is_deleted: false });
      return res.json(quymo);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async getDsLuongNuoc(req, res) {
    try {
      let { id } = req.params;
      let data = await LuongNuocSuDung.find({ phieudieutra_id: id, is_deleted: false })
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
