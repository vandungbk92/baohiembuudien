import DanhGiaDichVu from './danhgiadichvu.model';
import * as responseAction from '../../utils/responseAction';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';
import KhachHang from "../khachhang/khachhang.model";
var mongoose = require('mongoose');
export default {
  async create(req, res) {
    try {
      // thông tin gửi lên sẽ gồm mã thanh toán, diem, lydo
      // khi đánh giá dịch vụ sẽ truyền lên 1 mảng hoặc 1 object.
      if (Array.isArray(req.body)) {

      } else {

      }
      const data = await DanhGiaDichVu.create(req.body);
      return res.json(data);
    } catch (err) {
      responseAction.error(res, 500, err.errors)
    }
  },
  async findAll(req, res) {
    try {
      let {hoten} = req.query
      delete req.query.hoten
      let query = filterRequest(req.query, true)
      let options = optionsRequest(req.query)
      if (req.query.limit && req.query.limit === '0') {
        options.pagination = false;
      }

      if(hoten){
        // lấy danh sách khách hàng
        let mabn = await KhachHang.find({hoten: new RegExp(hoten.like, 'i')}).lean().distinct('_id')
        if(mabn.length) query.mabn = {$in: mabn}
        else return res.json({"docs":[],"totalDocs":0,"limit":10,"totalPages":1,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null})
      }

      //query.loaidanhgia = 1
      options.populate = [
        { path: 'mabn', select: 'hoten' },
        { path: 'dmdanhgia_id', select: 'tendanhgia' }
      ]



      const data = await DanhGiaDichVu.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const data = await DanhGiaDichVu.findOne({ is_deleted: false, _id: id });
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
      const data = await DanhGiaDichVu.findOneAndUpdate({ _id: id }, { is_deleted: true }, { new: true });
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
      const data = await DanhGiaDichVu.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (!data) {
        responseAction.error(res, 404, '')
      }
      return res.json(data);
    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },

  async thongke(req, res) {
    try {
      let query = filterRequest(req.query, true)
      if (query.dmdanhgia_id) query.dmdanhgia_id = mongoose.Types.ObjectId(query.dmdanhgia_id);
      query.loaidanhgia = 1
      // return  res.json(query)
      let duthongke = await DanhGiaDichVu.aggregate([
        {
          $match: query
        },
        {
          $group:
          {
            _id: "$dmdanhgia_id",
            diemtrungbinh: { $avg: "$diem" },
            tongluotdanhgia: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "dmdanhgia",
            localField: "_id", // field in the orders collection
            foreignField: "_id", // field in the items collection
            as: "dmdanhgia_id"
          }
        }
      ]
      )

      return res.json(duthongke);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

};
