import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const luotdanhgiaSchema = new Schema({
  mabn: {type: String, ref: 'BenhNhan', required: true},
  ngay: {type: Date},
  dangky_id: {type: String, ref: 'DangKy'},
  danhgiachung_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'DanhGiaDichVu'}],
  nhanxetchung: String,
  nhanxetdichvu: String,
  danhgiadichvu_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'DanhGiaDichVu'}],
  is_deleted: {type: Boolean, default: false}
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'luotdanhgia'
});
luotdanhgiaSchema.plugin(mongoosePaginate);
export default mongoose.model('LuotDanhGia', luotdanhgiaSchema);
