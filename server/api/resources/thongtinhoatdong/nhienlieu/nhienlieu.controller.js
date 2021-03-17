import nhienlieuService from './nhienlieu.service';
import NhienLieu from './nhienlieu.model';
import * as responseAction from '../../../utils/responseAction'

export default {
  async create(req, res) {
    try {
      let {dsthemmoi, dscapnhat} = req.body;

      if(!Array.isArray(dsthemmoi) || !Array.isArray(dscapnhat)){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }

      // kiểm tra dữ liệu.
      let isCheck = true;
      dsthemmoi.forEach(curr => {
        if(!curr.phieudieutra_id || !curr.loaiphieu_id || !curr.nhienlieutieuthu_id){
          isCheck = false
        }
      });
      dscapnhat.forEach(curr => {
        if(!curr.phieudieutra_id || !curr.loaiphieu_id || !curr.nhienlieutieuthu_id){
          isCheck = false
        }
      })
      if(!isCheck){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng, vui lòng kiểm tra và thử lại'});
      }
      // tạo mới.
      let dataAdd = await NhienLieu.create(dsthemmoi);

      // cập nhật.
      let promissUpt = dscapnhat.map(data => {
        return NhienLieu.findByIdAndUpdate(data._id, data, {new: true});
      })

      await Promise.all(promissUpt);



      return res.json(dataRtn);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await NhienLieu.findOne({is_deleted: false, _id: id})
        .populate({path: 'nhienlieutieuthu_id', select: 'tenhoachat'})

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

      const data = await NhienLieu.findByIdAndUpdate(id, {is_deleted: true}, { new: true });

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
      const { value, error } = nhienlieuService.validateBody(req.body, 'PUT');
      if (error && error.details) {
        return responseAction.error(res, 400, error.details[0])
      }
      const data = await NhienLieu.findOneAndUpdate({ _id: id }, value, { new: true })
        .populate({path: 'nhienlieutieuthu_id', select: 'tenhoachat'})

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
