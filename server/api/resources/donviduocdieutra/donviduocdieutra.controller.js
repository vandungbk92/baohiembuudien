import DonViDuocDieuTra from './donviduocdieutra.model';

import * as responseAction from '../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../utils/filterRequest';
import donviduocdieutraService from "./donviduocdieutra.service";

export default {
  async create(req, res) {
    try {
      const {value, error} = donviduocdieutraService.validateBody(req.body, 'POST');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await DonViDuocDieuTra.create(value);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async getAll(req, res) {
    try {
      let query = filterRequest(req.query, true);
      let options = optionsRequest(req.query);
      options.populate =[
        {path: 'loaiphieu_id', select: 'tenphieu'},
        {path: 'tinhthanhtruso_id',select:'tentinh'},
        {path: 'quanhuyentruso_id', select: 'tenqh'},
        {path: 'phuongxatruso_id', select: 'tenphuongxa'},
        {path: 'tinhthanhhoatdong_id',select:'tentinh'},
        {path: 'quanhuyenhoatdong_id', select: 'tenqh'},
        {path: 'phuongxahoatdong_id', select: 'tenphuongxa'},
      ]
      options.select = '-is_deleted';
      options.sort = {tencoso: 1}
      if (req.query.limit && req.query.limit === '0') {
        options.pagination = false;
      }
      // return res.json({success: true})
      const data = await DonViDuocDieuTra.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const {id} = req.params;
      const data = await DonViDuocDieuTra.findById(id)
      .populate({path: 'tinhthanhtruso_id', select: 'tentinh'})
      .populate({path: 'quanhuyentruso_id', select: 'tenqh'})
      .populate({path: 'phuongxatruso_id', select: 'tenphuongxa'})
      .populate({path: 'tinhthanhhoatdong_id', select: 'tentinh'})
      .populate({path: 'quanhuyenhoatdong_id', select: 'tenqh'})
      .populate({path: 'phuongxahoatdong_id', select: 'tenphuongxa'})
      if (!data) {
        return responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      const {id} = req.params;
      const tinhthanh = await DonViDuocDieuTra.findOneAndUpdate({_id: id}, {is_deleted: true}, {new: true});

      if (!tinhthanh) {
        return responseAction.error(res, 404, '')

      }
      return res.json(tinhthanh);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const {id} = req.params;

      const { value, error } = donviduocdieutraService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return  responseAction.error(res, 400, error.details[0])
      }

      const data = await DonViDuocDieuTra.findOneAndUpdate({_id: id}, value, {new: true});
      if (!data) {
        return responseAction.error(res, 404, '');
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
