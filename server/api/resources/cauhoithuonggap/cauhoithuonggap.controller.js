import CauHoiThuongGap from './cauhoithuonggap.model';
import cauhoithuonggapService from './cauhoithuonggap.service';

import * as responseAction from '../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';

export default {
    async getAll(req, res) {
      try {
        let query = filterRequest(req.query, true);
        let options = optionsRequest(req.query);
        options.select = '-is_deleted';
        if (req.query.limit && req.query.limit === '0') {
          options.pagination = false;
        }
        options.populate = [
          { path: 'nguoitao_id', select: 'full_name' },
        ];
        const data = await CauHoiThuongGap.paginate(query, options);
        return res.json(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
    async findOne(req, res) {
      try {
        const { id } = req.params;
        const data = await CauHoiThuongGap.findById(id)
          .populate({ path: 'nguoitao_id', select: 'full_name' });
        if (!data) {
          return responseAction.error(res, 404, '');
        }
        return res.json(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
    async create(req, res) {
      try {
        req.body.nguoitao_id = req.user._id;
  
        const { value, error } = cauhoithuonggapService.validateBody(req.body, 'POST');
        if (error && error.details) {
          return responseAction.error(res, 400, error.details[0]);
        }
  
        const data = await CauHoiThuongGap.create(value);
        const dataRtn = await data.populate({ path: 'nguoitao_id', select: 'full_name' })
          .execPopulate();
        return res.json(dataRtn);
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
    async update(req, res) {
      try {
        const { id } = req.params;
  
        const { value, error } = cauhoithuonggapService.validateBody(req.body, 'PUT');
        if (error && error.details) {
          return responseAction.error(res, 400, error.details[0]);
        }
  
        const data = await CauHoiThuongGap.findOneAndUpdate({ _id: id }, value, { new: true })
          .populate({ path: 'nguoitao_id', select: 'full_name' });
        if (!data) {
          return responseAction.error(res, 404, '');
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
        const cauhoithuonggap = await CauHoiThuongGap.findOneAndUpdate({ _id: id },{ is_deleted: true },{ new: true });
        if (!cauhoithuonggap) {
          return responseAction.error(res, 404, '');
        }
        return res.json(cauhoithuonggap);
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    },
  };
  