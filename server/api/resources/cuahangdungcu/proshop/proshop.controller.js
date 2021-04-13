import ProShop from './proshop.model';

import * as responseAction from '../../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../../utils/filterRequest';
import proshopService from "./proshop.service";

export default {
  async create(req, res) {
    try {
      const {value, error} = proshopService.validateBody(req.body, 'POST');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await ProShop.create(value);
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
        {path: 'donvitinh_id', select: 'tendonvi'},
        {path: 'trangthai_id',select:'tentrangthai'},
     
      ]
 
      if (req.query.limit && req.query.limit === '0') {
        options.pagination = false;
      }
      // return res.json({success: true})
      const data = await ProShop.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const {id} = req.params;
      const data = await ProShop.findById(id)
      .populate({path: 'donvitinh_id', select: 'tendonvi'})
      .populate({path: 'trangthai_id',select:'tentrangthai'})
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
      const data = await ProShop.findOneAndUpdate({_id: id}, {is_deleted: true}, {new: true});

      if (!data) {
        return responseAction.error(res, 404, '')

      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const {id} = req.params;

      const { value, error } = proshopService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return  responseAction.error(res, 400, error.details[0])
      }

      const data = await ProShop.findOneAndUpdate({_id: id}, value, {new: true});
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
