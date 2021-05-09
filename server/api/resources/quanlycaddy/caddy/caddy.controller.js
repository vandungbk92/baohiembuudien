import Caddy from './caddy.model';
import User from '../../user/user.model'
import userService from '../../user/user.service'
import * as responseAction from '../../../utils/responseAction'
import {filterRequest, optionsRequest} from '../../../utils/filterRequest';
import caddyService from "./caddy.service";

export default {
  async create(req, res) {
    try {
      const {value, error} = caddyService.validateBody(req.body, 'POST');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      let caddyInfo = await User.findOne({$or: [
          {email: value.email},
        ]})
      if (caddyInfo) {
        if (value.email === caddyInfo.email) {
          return res.status(400).json({success: false, message: 'Email đã được đăng ký'})
        }
      }
      const data = await Caddy.create(value);
      const item =
        {
          full_name: data.hoten,
          username: data.taikhoan,
          password: userService.encryptPassword(data.matkhau),
          email: data.email,
          phone: data.sdt,
          role: 'CADDY'
        }
      const docs = await User.create(item);
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
        {path: 'trangthai_id',select:'tentrangthai'},
      ]
      console.log(options,'optionsoptions');
      if (req.query.limit && req.query.limit === '0') {
        options.pagination = false;
      }
      // return res.json({success: true})
      const data = await Caddy.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const {id} = req.params;
      const data = await Caddy.findById(id)
     
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
      const data = await Caddy.findOneAndUpdate({_id: id}, {is_deleted: true}, {new: true});
      const data1 = await User.findOneAndUpdate({email: data.email}, {is_deleted: true}, {new: true});
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

      const { value, error } = caddyService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return  responseAction.error(res, 400, error.details[0])
      }
      

      const data = await Caddy.findOneAndUpdate({_id: id}, value, {new: true});
      if (!data) {
        return responseAction.error(res, 404, '');
      }
     // console.log('value',value);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
