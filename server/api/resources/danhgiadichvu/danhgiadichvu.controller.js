import DanhGiaDichVu from './danhgiadichvu.model';
import * as responseAction from '../../utils/responseAction';
import {filterRequest, optionsRequest} from '../../utils/filterRequest';
import DmDanhGia from '../dmdanhgia/dmdanhgia.model';
import LuotDanhGia from './luotdanhgia.model';
import DangKy from '../dangky/dangky.model';
import {thongtindichvudanhgia} from "./danhgiadichvu.utils";
import ThanhToanCT from "../thanhtoanct/thanhtoanct.model";
import moment from 'moment';
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
      let query = filterRequest(req.query, true)
      let options = optionsRequest(req.query)
      if(req.query.limit && req.query.limit === '0'){
        options.pagination = false;
      }
      query.loaidanhgia = 2
      options.populate=[{path: 'manv',select:'tennv'},
        {path: 'mabn',select:'hoten'},
        {path: 'maphong',select:'tenphong'},
        {path: 'mahh',select:'tendichvu'},
        {path: 'makk',select:'tenkk'}]
      const data = await DanhGiaDichVu.paginate(query, options)
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const {id} = req.params;
      const data = await DanhGiaDichVu.findOne({is_deleted: false, _id: id});
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
      const {id} = req.params;
      const data = await DanhGiaDichVu.findOneAndUpdate({_id: id}, {is_deleted: true}, {new: true});
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
      const {id} = req.params;
      const data = await DanhGiaDichVu.findOneAndUpdate({_id: id}, req.body, {new: true});
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
      if (query.mahh) query.mahh = parseInt(query.mahh);
      if (query.makhambenh) query.makhambenh = parseInt(query.makhambenh);
      if (query.manv) query.manv = parseInt(query.manv);
      if (query.makk) query.makk = parseInt(query.makk);
      if (query.maphong) query.maphong = parseInt(query.maphong);
      query.loaidanhgia = 2
      // return  res.json(query)
      let duthongke = await DanhGiaDichVu.aggregate([
          {
            $match: query
          },
          {
            $group:
              {
                _id: "$manv",
                diemtrungbinh: {$avg: "$diem"},
                tongluotdanhgia: {$sum: 1}
              }
          },
          {
            $lookup: {
              from: "dmnhanvien",
              localField: "_id", // field in the orders collection
              foreignField: "_id", // field in the items collection
              as: "manv"
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

  async dsDanhGiaDvBenhNhan(req, res) {
    try {
      // _id của bệnh nhân.
      let {_id} = req.user

      let danhgiachung = []
      let dichvu = []
      // nếu bệnh nhân đã đánh giá dịch vụ chung ngày hnay rồi thì k cho đánh giá nữa.
      const today = moment().startOf('day')
      let luotdanhgia = await LuotDanhGia.findOne({ngay: {
          $gte: today.toDate(),
          $lte: moment(today).endOf('day').toDate()
        },
        mabn: _id,
        danhgiachung_id: { $exists: true, $ne: [] } });
      if(!luotdanhgia){
        // lấy danh sách dịch vụ cần đánh giá của bệnh nhân
        danhgiachung = await DmDanhGia.find({trangthai: true, is_deleted: false}, 'tendanhgia').sort({sothutu: -1})
      }

      // tìm lần đăng ký khám bệnh gần nhất.
      let dangky = await DangKy.findOne({mabn: req.user._id}).sort({ngaydk: -1});
      // nếu có đăng ký thì mới tìm đến các dịch vụ, còn k có thì thôi.

      if(dangky && !dangky.danhgia){
        dichvu = await thongtindichvudanhgia(dangky)
      }

      /*dichvu = dichvu.filter(curr => {
        return curr.mahh && curr.mahh.danhgia
      })*/
      return res.json({dichvu, danhgiachung});

    } catch (err) {
      console.error(err);
      responseAction.error(res, 500, err.errors)
    }
  },

  async dsLuotDanhGiaBenhNhan(req, res) {
    try {
      // _id của bệnh nhân.
      let {_id} = req.user

      let query = filterRequest(req.query, true)
      query.mabn = _id
      let options = optionsRequest(req.query)
      if(req.query.limit && req.query.limit === '0'){
        options.pagination = false;
      }
      options.populate = [
        {path: 'danhgiachung_id', select: 'dmdanhgia_id diem lydo', populate: {path: 'dmdanhgia_id', select: 'tendanhgia'}},
        {path: 'danhgiadichvu_id', select: 'mahh diem lydo', populate: {path: 'mahh', select: 'tendichvu'}}
      ]
      const data = await LuotDanhGia.paginate(query, options);
      return res.json(data);
    } catch (err) {
      console.error(err);
      return responseAction.error(res, 500, err.errors)
    }
  },

  async danhgiaDichVu(req, res) {
    try {
      let danhgiachungRtn = null
      let dichvuRtn = null
      // lấy id của bệnh nhân
      const { _id } = req.user;
      // lấy thông tin của body gửi lên.
      let body = req.body
      let danhgiachung = body.danhgiachung || []
      let dichvu = body.dichvu || []

      if((!Array.isArray(danhgiachung) || !danhgiachung.length) && (!Array.isArray(dichvu) || !dichvu.length)){
        return res.status(400).json({success: false, message: 'Dữ liệu đánh giá không đúng định dạng'});
      }
      const today = moment().startOf('day')
      let luotdanhgiaInfo = await LuotDanhGia.findOne({ngay: {
          $gte: today.toDate(),
          $lte: moment(today).endOf('day').toDate()
        },
        mabn: _id,
        danhgiachung_id: { $exists: true, $ne: [] } });
      // nếu chưa đánh giá mới cho đánh giá chung mới.
      if(luotdanhgiaInfo){
        danhgiachung = []
      }

      // chuẩn bị dữ liệu cho lượt đánh giá.
      let luotdanhgiaAdd = await LuotDanhGia.create({
        mabn: _id,
        ngay: new Date(),
        nhanxetchung: body.nhanxetchung,
        nhanxetdichvu: body.nhanxetdichvu
      })

      // kiểm tra xem dữ liệu của danhgiachung có tồn tại không
      if(danhgiachung && danhgiachung.length){
        let arrDanhGiaChung = []
        danhgiachung.map(data => {
          if(data.diem){
            data.luotdanhgia_id = luotdanhgiaAdd._id
            data.loaidanhgia = 1;
            data.mabn = _id;
            arrDanhGiaChung = [...arrDanhGiaChung, data]
          }
        })
        if(arrDanhGiaChung.length){
          let danhgiachungAdd = await DanhGiaDichVu.create(arrDanhGiaChung)
          danhgiachungRtn = await DanhGiaDichVu.populate(danhgiachungAdd, {path: 'dmdanhgia_id', select: 'tendanhgia', model: 'DmDanhGia'})
          let danhgiachung_id = danhgiachungAdd.map(data => data._id)

          // cập nhật lại lượt đánh giá.
          let luotdanhgiaUpt = await LuotDanhGia.findByIdAndUpdate(luotdanhgiaAdd._id, {danhgiachung_id: danhgiachung_id}, {new: true});
        }
      }


      // dữ liệu đánh giá dịch vụ
      if(dichvu && dichvu.length){
        // chuẩn bị dữ liệu tạo mới
        let dulieudanhgia = [];
        let dangky_id = null;

        await Promise.all(dichvu.map(async data => {
          if(data.diem && data.mathanhtoanct){
            let dataThanhToanCT = await ThanhToanCT.findById(data.mathanhtoanct)
              .populate({path: 'mathanhtoan', select: 'makhambenh',
                populate: {path: 'makhambenh', select: 'makcb manv makk maphong'}}).lean();

            let dataKhamBenh = dataThanhToanCT.mathanhtoan.makhambenh
            dangky_id = dataKhamBenh.makcb
            let objDataAdd = {
              makcb: dataKhamBenh.makcb,
              makhambenh: dataKhamBenh._id,
              mabn: _id,
              mathanhtoanct: data.mathanhtoanct,
              mathanhtoan: dataThanhToanCT.mathanhtoan._id,
              mahh: dataThanhToanCT.mahh,
              manv: dataKhamBenh.manv,
              makk: dataKhamBenh.makk,
              maphong: dataKhamBenh.maphong,
              diem: data.diem,
              lydo: data.lydo,
              luotdanhgia_id: luotdanhgiaAdd._id,
              loaidanhgia: 2
            }
            dulieudanhgia = [...dulieudanhgia, objDataAdd]
          }
        }))

        if(dulieudanhgia.length){

          let dangkyInfo = await DangKy.findById(dangky_id);
          // nếu chưa đánh giá mới cho đánh giá
          if(!dangkyInfo.danhgia){
            let dataAdd = await DanhGiaDichVu.create(dulieudanhgia);
            dichvuRtn = await DanhGiaDichVu.populate(dataAdd, [{path: 'mahh', select: 'tendichvu', model: 'DmDichVu'}, {path: 'manv', select: 'tennv', model: 'DmNhanVien'}])
            // cập nhật đăg ký là đã đánh giá.
            let dangky = await DangKy.findByIdAndUpdate(dangky_id, {danhgia: true}, {new: true});

            let danhgiadichvu_id = dataAdd.map(data => data._id)
            // cập nhật lại lượt đánh giá.
            let luotdanhgiaUpt = await LuotDanhGia.findByIdAndUpdate(luotdanhgiaAdd._id, {danhgiadichvu_id: danhgiadichvu_id}, {new: true});
          }
        }
      }

      if(!danhgiachungRtn && !dichvuRtn){
        await LuotDanhGia.findByIdAndRemove(luotdanhgiaAdd._id)
        return res.status(400).json({success: false, message: 'Dữ liệu đánh giá không tồn tại hoặc đã được đánh giá'})
      }else{
        return res.json({dichvu: dichvuRtn, danhgiachung: danhgiachungRtn,
          _id: luotdanhgiaAdd._id,
          nhanxetchung: luotdanhgiaAdd.nhanxetchung,
          nhanxetdichvu: luotdanhgiaAdd.nhanxetdichvu
        })
      }
    } catch (err) {
      console.error(err);
      return responseAction.error(res, 500, err.errors)
    }
  },
};
