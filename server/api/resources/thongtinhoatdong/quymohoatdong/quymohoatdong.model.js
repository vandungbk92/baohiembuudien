import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const quymohoatdongSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  sanpham_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SanPham',
    required: false
  },
  loaihoatdong_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiHoatDong',
    required: false
  },
  congnghesx_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CongNgheSanXuat',
  },
  congsuatthietke: {
    type: String
  },
  congnghexuly: {
    type: String
  },
  congsuathoatdong: {
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
  collection: 'quymohoatdong'
});
quymohoatdongSchema.plugin(mongoosePaginate);
export default mongoose.model('QuyMoHoatDong', quymohoatdongSchema);
