import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const dangkySchema = new Schema({
  _id: { type: String, required: true },
  mabn: { type: String, ref: 'BenhNhan' },
  ngaydk: { type: Date },
  sothutudk: { type: String },
  makk: {type: Number, ref: 'DmKK'},
  maphong: {type: Number, ref: 'DmPhong'},
  capcuu: {type: Boolean},
  mahinhthucden: { type: Number, ref: 'DmHinhThucDenKham'},
  manv: { type: Number, ref: 'DmNhanVien'},
  madoituong: { type: Number, ref: 'DmDoiTuong'},
  tuoi: { type: String },
  mantinh: { type: Boolean },
  ngoaigio: { type: Boolean },
  danhgia: {type: Boolean, default: false},
  dknhapvien: {type: String, ref: 'DangKyNhapVien'},
  dkravien: {type: String, ref: 'DangKyRaVien'},
  thanhtoanrv: {type: String, ref: 'ThanhToanRV'},
  is_deleted: {type: Boolean, default: false}
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'dangky'
});
dangkySchema.plugin(mongoosePaginate);
export default mongoose.model('DangKy', dangkySchema);
