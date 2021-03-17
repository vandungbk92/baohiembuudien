import thongtinduanService from './thongtinduan.service';
import ThongTinDuAn from './thongtinduan.model';
import * as responseAction from '../../../utils/responseAction';

export default {
  async create(req, res) {
    try {
      const { value, error } = thongtinduanService.validateBody(req.body, 'POST');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0]);
      }
      const data = await ThongTinDuAn.create(value);
      return res.json(data);
    } catch (err) {
      return responseAction.error(res, 500, err.errors)
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await ThongTinDuAn.findOne({is_deleted: false, _id: id})

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
      const { id } = req.params;

      const data = await ThongTinDuAn.findByIdAndUpdate(id, {is_deleted: true}, { new: true });
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
      const { id } = req.params;
      const { value, error } = thongtinduanService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await ThongTinDuAn.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!data) {
        return  responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return responseAction.error(res, 500, err.errors)
    }
  },
};
