import fnbService from './fnb.service';
import FnB from './fnb.model';
import * as responseAction from '../../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../../utils/filterRequest'

export default {
  async create(req, res) {
    try {
      const { value, error } = fnbService.validateBody(req.body, 'POST');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0])
      }
      let fnbcheck = await FnB.findOne({tenmon: value.tenmon.trim(), is_deleted: false})
      if (fnbcheck) {
            return res.status(400).json({success: false, message: 'Món ăn viên đã tồn tại'})
        }
      const data = await FnB.create(value);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if(req.query.limit && req.query.limit === '0'){
        const totalQuery = await FnB.paginate(query, {limit: 0})
        req.query.limit = totalQuery.total
      }

      let options = optionsRequest(req.query)
      options.populate =[

        {path: 'trangthai_id',select:'tentrangthai'},
     
      ]
      const data = await FnB.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },


  async findOne(req, res) {  try {
    const {id} = req.params;
    const data = await FnB.findById(id)
   
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
      const { id } = req.params;

      const data = await FnB.findOneAndUpdate({ _id: id }, {is_deleted: true}, { new: true });

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
      const { value, error } = fnbService.validateBody(req.body, 'PUT');
      if (error && error.details) {
          responseAction.error(res, 400, error.details[0])
      }
      const data = await FnB.findOneAndUpdate({ _id: id }, value, { new: true })
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
