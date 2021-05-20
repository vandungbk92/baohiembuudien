import lichsangolfService from './lichsangolf.service';
import LichSanGolf from './lichsangolf.model';
import * as responseAction from '../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../utils/filterRequest'

export default {
  async create(req, res) {
    try {
      const { value, error } = lichsangolfService.validateBody(req.body, 'POST');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0])
      }
      const data = await LichSanGolf.create(value);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await LichSanGolf.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }
      let options = optionsRequest(req.query)
      options.populate=[
        {path: 'thu2'},
        {path: 'thu3'},
        {path: 'thu4'},
        {path: 'thu5'},
        {path: 'thu6'},
        {path: 'thu7'},
        {path: 'chunhat'},
        ]
      const data = await LichSanGolf.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LichSanGolf.findOne({is_deleted: false, _id: id})
        .populate('thu2')
        .populate('thu3')
        .populate('thu4')
        .populate('thu5')
        .populate('thu6')
        .populate('thu7')
        .populate('chunhat')

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

      const data = await LichSanGolf.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });
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
      const { value, error } = lichsangolfService.validateBody(req.body, 'PUT');
      if (error && error.details) {
          responseAction.error(res, 400, error.details[0])
      }
      const data = await LichSanGolf.findOneAndUpdate({ _id: id }, value, { new: true })
      if (!data) {
          responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },

  // Lấy khung giờ làm việc theo thứ
  async getKhungGioTheoThu(req, res) {
    try {
      let thu = req.query.thu
      const data = await LichSanGolf.find({is_deleted: false}).sort({created_at : -1}).populate('thu2')
        .populate('thu3')
        .populate('thu4')
        .populate('thu5')
        .populate('thu6')
        .populate('thu7')
        .populate('chunhat')
      let lichmoinhat = data[0]
      let khunggio = lichmoinhat[`${thu}`]
      return res.json(khunggio);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

};
