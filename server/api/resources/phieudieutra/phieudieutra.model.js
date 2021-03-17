import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const phieudieutraSchema = new Schema({

  donviduocdieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonViDuocDieuTra',
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu',
  },
  ngaynhaplieu: {type: Date, required: true},
  tencoso: {
    type: String,
    required: true
  },
  chunguonthai: {
    type: String
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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
phieudieutraSchema.plugin(mongoosePaginate);
export default mongoose.model('PhieuDieuTra', phieudieutraSchema);
