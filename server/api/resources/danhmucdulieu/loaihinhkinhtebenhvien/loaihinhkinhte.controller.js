import loaihinhkinhteService from './loaihinhkinhte.service';
import LoaiHinhKinhTe from './loaihinhkinhte.model';
import * as responseAction from '../../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../../utils/filterRequest'

export default {
  async create(req, res) {
    try {
      const { value, error } = loaihinhkinhteService.validateBody(req.body, 'POST');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0])
      }
      const data = await LoaiHinhKinhTe.create(value);
      let datares = await data.populate({path: 'loaiphieu_id', select: 'tenphieu'})
      return res.json(datares);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await LoaiHinhKinhTe.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }
      let options = optionsRequest(req.query)
      options.populate = [
        ({path: 'loaiphieu_id', select: 'tenphieu'})
      ]
      const data = await LoaiHinhKinhTe.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LoaiHinhKinhTe.findOne({is_deleted: false, _id: id})
      .populate({path: 'loaiphieu_id', select: 'tenphieu'})

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

      const data = await LoaiHinhKinhTe.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });

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
      const { value, error } = loaihinhkinhteService.validateBody(req.body, 'PUT');
      if (error && error.details) {
          responseAction.error(res, 400, error.details[0])
      }
      const data = await LoaiHinhKinhTe.findOneAndUpdate({ _id: id }, value, { new: true })
      .populate({path: 'loaiphieu_id', select: 'tenphieu'});

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
