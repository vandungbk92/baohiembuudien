import KetQuaCLS from './ketquacls.model';
import * as responseAction from '../../utils/responseAction';
import {filterRequest, optionsRequest} from '../../utils/filterRequest';
import ketquaclsService from "./ketquacls.service";

export default {
  async create(req, res) {
    try {
      const { value, error } = ketquaclsService.validateSignup(req.body, 'POST');
      if (error) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }
      const data = await KetQuaCLS.create(value);
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
      options.populate=[{path: 'machuong',select:'tenchuong'},
        {path: 'manhombenh',select:'tennhombenh'},
        {path: 'magom',select:'tengom'}]
      const data = await KetQuaCLS.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await KetQuaCLS.findOne({is_deleted: false, _id: id});
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
      const data = await KetQuaCLS.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });
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
      const { value, error } = ketquaclsService.validateSignup(req.body, 'PUT');
      if (error) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }

      const { id } = req.params;
      const data = await KetQuaCLS.findOneAndUpdate({ _id: id }, value, { new: true });
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
