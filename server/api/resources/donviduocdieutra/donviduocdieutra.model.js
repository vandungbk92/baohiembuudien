import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const donviduocdieutraSchema = new Schema({
  tencoso: {
    type: String,
    required: true
  },
  chunguonthai: {
    type: String
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu',
  },
  tinhthanhhoatdong_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TinhThanh',
  },
  quanhuyenhoatdong_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuanHuyen',
  },
  phuongxahoatdong_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhuongXa',
  },
  tinhthanhtruso_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TinhThanh',
  },
  quanhuyentruso_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuanHuyen',
  },
  phuongxatruso_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhuongXa',
  },
  nguoidaidien: {
    type: String
  },
  dienthoai: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
    type: String
  },
  khukinhte: {
    type: String
  },

  xephangcoso: {
    type: String
  },
  loaihinhxuly:[{
    type: String
  }],
  loaihinhkinhte: {
    type: String
  },
  ngheuutien: {
    type: String
  },
  namhoatdong: {
    type: Number
  },
  dientichmatbang: {
    type: Number
  },
  sonhanvien: {
    type: Number
  },
  website: {
    type: String
  },
  langnghe: {
    type: String
  },
  kinhdo: {
    type: String
  },
  vido: {
    type: String
  },
  xephang: {
    type: String
  },
  is_deleted: {type: Boolean, default: false, select: false}
});
donviduocdieutraSchema.plugin(mongoosePaginate);
export default mongoose.model('DonViDuocDieuTra', donviduocdieutraSchema);
