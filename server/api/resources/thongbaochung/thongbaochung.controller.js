import ThongBaoChung from './thongbaochung.model';
import TinTuc from '../tintucsangolf/tintuc/sangolf.model';
import HuongDan from '../huongdan/huongdan/huongdan.model';
import * as responseAction from '../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';
import {pushNotifyMobile} from "../../utils/pushNotifyMobile";


export default {
  async getAll(req, res) {
    try {
      let query = filterRequest(req.query, true);
      let options = optionsRequest(req.query);
      options.populate = [{path: 'link_push_id', select: 'tieude'}, {path: 'user_id', select: 'full_name'}]
      const data = await ThongBaoChung.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await ThongBaoChung.findById(id)
        .populate({ path: 'user_id', select: 'full_name' });
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
      req.body.user_id = req.user._id;
      const data = await ThongBaoChung.create(req.body);
      const dataRtn = await data
        .populate({ path: 'user_id', select: 'full_name' })
        .execPopulate();

      // đếm xem đâ tạo bao nhiêu thông báo để cập nhật tin tức.
      if(data.loaithongbao === 'TinTuc'){
        let countThongBao = await ThongBaoChung.count({link_push_id: data.link_push_id});
        // cập nhật tin tức.
        await TinTuc.findByIdAndUpdate(data.link_push_id, {sothongbao: countThongBao})
      }else if(data.loaithongbao === 'HuongDan'){
        let countThongBao = await ThongBaoChung.count({link_push_id: data.link_push_id});
        // cập nhật tin tức.
        await HuongDan.findByIdAndUpdate(data.link_push_id, {sothongbao: countThongBao})
      }
      pushNotifyMobile(data);
      return res.json(dataRtn);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;

      const data = await ThongBaoChung.findOneAndUpdate({ _id: id }, value, { new: true })
        .populate({ path: 'user_id', select: 'full_name' });
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
      const thongbaochung = await ThongBaoChung.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true },
      );
      if (!thongbaochung) {
        return responseAction.error(res, 404, '');
      }
      return res.json(thongbaochung);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};
