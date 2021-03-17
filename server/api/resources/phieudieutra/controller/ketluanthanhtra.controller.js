import KetLuanThanhTra from '../../ketluanthanhtra/ketluanthanhtra.model';


export default {
  async getDsKetLuanThanhTra(req, res) {
    try {
      let { id } = req.params;
      let data = await KetLuanThanhTra.findOne({ phieudieutra_id: id, is_deleted: false })
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
