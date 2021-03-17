import loaiphieuService from './loaiphieu.service';
import LoaiPhieu from './loaiphieu.model';
import PhieuDieuTra from '../phieudieutra/phieudieutra.model';
import * as responseAction from '../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../utils/filterRequest'

export default {
  async create(req, res) {
    try {
      const { value, error } = loaiphieuService.validateBody(req.body, 'POST');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0])
      }
      const data = await LoaiPhieu.create(value);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await LoaiPhieu.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }
      let options = optionsRequest(req.query)
      options.sort = {thutu: 1}
      const data = await LoaiPhieu.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LoaiPhieu.findOne({is_deleted: false, _id: id})
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

      const data = await LoaiPhieu.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });

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
      const { value, error } = loaiphieuService.validateBody(req.body, 'PUT');
      if (error && error.details) {
          responseAction.error(res, 400, error.details[0])
      }
      delete value.link
      const data = await LoaiPhieu.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!data) {
          responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },

  async thongkeLoaiPhieu(req, res) {
    try {
      let query = filterRequest(req.query, true)


      // return  res.json(query)
      let duthongke = await PhieuDieuTra.aggregate([
          {
            $match: query
          },
          {
            $group:
              {
                _id: "$loaiphieu_id",
                sophieu: {$sum: 1}
              }
          }
        ]
      )
      return res.json(duthongke)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
