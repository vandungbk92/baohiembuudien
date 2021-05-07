import DangKy from './dangky.model';
import DangKyNhapVien from '../dangkynhapvien/dangkynhapvien.model';
import DangKyRaVien from '../dangkyravien/dangkyravien.model';
import ThanhToanRV from './thanhtoanrv.model';
import * as responseAction from '../../utils/responseAction';
import {filterRequest, optionsRequest} from '../../utils/filterRequest';

export default {
  async create(req, res) {
    try {
      const data = await DangKy.create(req.body);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)

      let options = optionsRequest(req.query)
      if(req.query.limit && req.query.limit === '0'){
        options.pagination = false;
      }
      options.populate=[{path: 'mabn',select:'hoten'},
        {path: 'makk',select:'tenkk'},
        {path: 'maphong',select:'tenphong'},
        {path: 'mahinhthucden',select:'tenhtd'},
        {path: 'manv',select:'tennv'},
        {path: 'madoituong',select:'tendoituong'}]
      const data = await DangKy.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await DangKy.findOne({_id: id})
        .populate({path: 'mabn',select:'hoten'})
        .populate({path: 'madoituong',select:'tendoituong'})
        .populate({path: 'dknhapvien',select:'ngay makk maphong', populate: [{path: 'makk', select: 'tenkk'}, {path: 'maphong', select: 'tenphong'}]})
        .populate({path: 'dkravien',select:'ngay makk maphong', populate: [{path: 'makk', select: 'tenkk'}, {path: 'maphong', select: 'tenphong'}]})
        .populate({path: 'thanhtoanrv',select:'ngaytt datt'})
      if (!data) {
        responseAction.error(res, 404, '')
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
      const data = await DangKy.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });
      if (!data) {
        responseAction.error(res, 404, '')
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
      const data = await DangKy.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (!data) {
        responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },
};
