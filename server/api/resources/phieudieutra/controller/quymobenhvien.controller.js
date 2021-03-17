import QuyMoBenhVien from '../../thongtinhoatdong/quymobenhvien/quymobenhvien.model';
import * as responseAction from '../../../utils/responseAction'
import PhieuDieuTra from '../phieudieutra.model';

export default {
  async getDsQuyMoBenhVien(req, res) {
    try {
      let { id } = req.params;
      let data = await QuyMoBenhVien.findOne({ phieudieutra_id: id, is_deleted: false })
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
