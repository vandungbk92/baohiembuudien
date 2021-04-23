import Tintuc from './sangolf.model';
import tintucService from './sangolf.service';

import * as responseAction from '../../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../../utils/filterRequest';
import ThongBaoChung from "../../thongbaochung/thongbaochung.model";
import {pushNotifyMobile} from "../../../utils/pushNotifyMobile";

export default {
  async getAll(req, res) {
    try {
      let query = filterRequest(req.query, true);
      let options = optionsRequest(req.query);
      options.select = '-is_deleted';
      options.sort = { thutu: 1 };
      if (req.query.limit && req.query.limit === '0') {
        options.pagination = false;
      }
      options.populate = [
        { path: 'danhmuc_id', select: 'ten' },
        { path: 'nguoitao_id', select: 'full_name' },
      ];
      const data = await Tintuc.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await Tintuc.findById(id)
        .populate({ path: 'danhmuc_id', select: 'ten' })
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

      const { value, error } = tintucService.validateBody(req.body, 'POST');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0]);
      }
      if(value.guithongbao){value.sothongbao = 1}
      const data = await Tintuc.create(value);
      const dataRtn = await data.populate({ path: 'danhmuc_id', select: 'ten' })
        .populate({ path: 'nguoitao_id', select: 'full_name' })
        .execPopulate();

      // kiểm tra xem có push thông báo không.
      if(value.guithongbao){
        const thongbao = await ThongBaoChung.create({
          user_id: req.user._id,
          link_push_id: data._id,
          loaithongbao: 'TinTuc'
        });
        pushNotifyMobile(thongbao)
      }
      return res.json(dataRtn);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;

      const { value, error } = tintucService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0]);
      }

      const data = await Tintuc.findOneAndUpdate({ _id: id }, value, { new: true })
        .populate({ path: 'danhmuc_id', select: 'ten' })
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
      const tintuc = await Tintuc.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true },
      );
      if (!tintuc) {
        return responseAction.error(res, 404, '');
      }
      return res.json(tintuc);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
