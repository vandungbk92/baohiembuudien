import lichhenService from './lichhen.service';
import LichHen from './lichhen.model';
import * as responseAction from '../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../utils/filterRequest'
import Caddy from '../quanlycaddy/caddy/caddy.model';
import LichLamViecCaddy from '../quanlycaddy/lichlamvieccaddy/lichlamvieccaddy.model'
import path from 'path';

export default {
  async create(req, res) {
    try {
      const { value, error } = lichhenService.validateBody(req.body, 'POST');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0])
      }
      const data = await LichHen.create(value);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await LichHen.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }

      let options = optionsRequest(req.query)

      options.populate=[{path: 'khachchoi_id'} , {path: 'khunggio_id'}, {path : "caddy_id"}]
      const data = await LichHen.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LichHen.findOne({is_deleted: false, _id: id}).populate('khachchoi_id').populate('khunggio_id').populate('caddy_id' )
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

      const data = await LichHen.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });
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
      const { value, error } = lichhenService.validateBody(req.body, 'PUT');
      if (error && error.details) {
          responseAction.error(res, 400, error.details[0])
      }
      const data = await LichHen.findOneAndUpdate({ _id: id }, value, { new: true })
      if (!data) {
          responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },

  async getALLCaddybyLichLamViec(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await LichHen.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }
      let options = optionsRequest(req.query)

      // options.populate=[{path: ''}]
      const data = await LichHen.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async getLichHenByCaddy(req, res) {
    try {
      let { id } = req.params;
      let data = await LichHen.find({ caddy_id: id, is_deleted: false }).sort({created_at : -1}).populate('khachchoi_id').populate('khunggio_id')
        .populate({path: 'caddy_id', select: 'hoten'});
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
