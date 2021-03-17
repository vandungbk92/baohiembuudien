import HoSoMoiTruong from '../../hosomoitruong/hosomoitruong.model';
import * as responseAction from '../../../utils/responseAction'
import PhieuDieuTra from '../phieudieutra.model';

export default {
  async getDsHoSoMoiTruong(req, res) {
    try {
      let { id } = req.params;
      let data = await HoSoMoiTruong.findOne({ phieudieutra_id: id, is_deleted: false })
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
