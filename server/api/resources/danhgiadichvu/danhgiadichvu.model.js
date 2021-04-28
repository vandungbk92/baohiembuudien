import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const danhgiadichvuSchema = new Schema({
  makcb: {type: String, ref: 'DangKy'},
  makhambenh: {type: Number, ref: 'KhamBenh'},
  mabn: {type: String, ref: 'BenhNhan'},
  mahh: {type: Number, ref: 'DmDichVu'},
  manv: {type: Number, ref: 'DmNhanVien'},
  makk: {type: Number, ref: 'DmKK'},
  mathanhtoan: {type: Number, ref: 'ThanhToan'},
  mathanhtoanct: {type: Number, ref: 'ThanhToanCT'},
  maphong: {type: Number, ref: 'DmPhong'},
  diem: {type: Number},
  lydo: {type: String},
  is_deleted: {type: Boolean, default: false},
  luotdanhgia_id: {type: mongoose.Schema.Types.ObjectId, ref: 'LuotDanhGia'},
  dmdanhgia_id: {type: mongoose.Schema.Types.ObjectId, ref: 'DmDanhGia'},
  loaidanhgia: {type: Number} // 1 là đánh giá chung. 2 là đánh giá dịch vụ.
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'danhgiadichvu'
});
danhgiadichvuSchema.plugin(mongoosePaginate);
export default mongoose.model('DanhGiaDichVu', danhgiadichvuSchema);
