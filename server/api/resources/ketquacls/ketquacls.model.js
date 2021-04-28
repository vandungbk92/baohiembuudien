import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const ketquaclsSchema = new Schema({
  mahh: {type: Number, ref: 'DmDichVu', required: true},
  mathanhtoan: {type: Number, ref: 'ThanhToan'},
  mathanhtoanct: {type: Number, ref: 'ThanhToanCT'},
  macs: {type: Number, ref: 'DmChiSo'},
  makcb: {type: String, ref: 'DangKy'},
  barcode: {type: String},
  manvlam: {type: Number, ref: 'DmNhanVien'},

  maktvlam: {type: Number, ref: 'DmNhanVien'},
  daduyet: {type: Boolean},
  ngaylam: {type: Date},
  ngaykhopBC: {type: Date},
  ngaytraKQ: {type: Date},
  ketluan: {type: String},
  mota: {type: String},
  denghi: {type: String},
  docketqua: {type: String},
  duyetkq: {type: Boolean},
  ngoaigio: {type: Boolean},
  kythuat: {type: String},
  ketqua: {type: String},
  madaudo: {type: String},
  is_deleted: {type: Boolean, default: false},
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'ketquacls'
});
ketquaclsSchema.plugin(mongoosePaginate);
export default mongoose.model('KetQuaCLS', ketquaclsSchema);
