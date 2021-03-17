import ThongTinDuAn from '../../thongtinhoatdong/thongtinduan/thongtinduan.model';

export default {
  async getThongTinDuAn(req, res) {
    try {
      let { id } = req.params;
      let data = await ThongTinDuAn.findOne({ phieudieutra_id: id, is_deleted: false })
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
