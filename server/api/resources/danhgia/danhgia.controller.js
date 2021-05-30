import danhgiaService from "./danhgia.service";
import DanhGia from "./danhgia.model";
import LichHen from "../lichhen/lichhen.model";
import * as responseAction from "../../utils/responseAction";
import { filterRequest, optionsRequest } from "../../utils/filterRequest";

export default {
  async create(req, res) {
    try {
      const { value, error } = danhgiaService.validateBody(req.body, "POST");
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }
      const data = await DanhGia.create(value);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors);
    }
  },

  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true);
      if (req.query.limit && req.query.limit === "0") {
        const totalQuery = await DanhGia.paginate(query, { limit: 0 });
        req.query.limit = totalQuery.total;
      }

      let options = optionsRequest(req.query);

      options.populate = [{ path: "lichhen_id" }];
      const data = await DanhGia.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await DanhGia.findOne({ is_deleted: false, _id: id }).populate("lichhen_id");
      if (!data) {
        responseAction.error(res, 404, "");
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

      const data = await DanhGia.findOneAndUpdate({ _id: id }, { is_deleted: true }, { new: true });
      if (!data) {
        responseAction.error(res, 404, "");
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
      const { value, error } = danhgiaService.validateBody(req.body, "PUT");
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0]);
      }
      const data = await DanhGia.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!data) {
        responseAction.error(res, 404, "");
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors);
    }
  },

  async findOneByLichHenId(req, res) {
    try {
      let { id } = req.params;
      const data = await DanhGia.findOne({ lichhen_id: id, is_deleted: false })
        .sort({ created_at: -1 })
        .populate({ path: "lichhen_id" });
      // if (!data) {
      //   responseAction.error(res, 404, "aaaaaaaaaaaa");
      // }
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
