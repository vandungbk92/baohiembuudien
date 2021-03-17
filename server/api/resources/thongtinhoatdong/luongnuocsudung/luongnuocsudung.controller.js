import luongnuocsudungService from './luongnuocsudung.service';
import LuongNuocSuDung from './luongnuocsudung.model';
import * as responseAction from '../../../utils/responseAction';

export default {
  async create(req, res) {
    try {
      return res.json({success: true});
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LuongNuocSuDung.findOne({is_deleted: false, _id: id})

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

      const data = await LuongNuocSuDung.findByIdAndUpdate(id, {is_deleted: true}, { new: true });
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
      const { value, error } = luongnuocsudungService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await LuongNuocSuDung.findOneAndUpdate({ _id: id }, value, { new: true });
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
