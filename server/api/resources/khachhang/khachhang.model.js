import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const benhnhanSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  hoten: {
    type: String,
    required: true,
  },
  ngaysinh: {
    type: Date
  },
  maphai: {
    type: Number,
    ref: 'DmPhai',
  },
  madantoc: {
    type: Number,
    ref: 'DmDanToc',
  },
  maquoctich: {
    type: Number,
    ref: 'DmQuocTich',
  },
  manghenghiep: {
    type: Number,
    ref: 'DmNgheNghiep',
  },
  sonha: {type: String},
  thonpho: {type: String},
  mapx: {
    type: Number,
    ref: 'DmPhuongXa',
  },
  maqh: {
    type: Number,
    ref: 'DmQuanHuyen',
  },
  matt: {
    type: Number,
    ref: 'DmTinhThanh',
  },
  dienthoai: {type: String, required: true},
  email: {type: String},

  taikhoan: {
    type: String,
    required: true
  },
  matkhau: {
    type: String,
    required: true,
  },
  is_deleted: {type: Boolean, default: false},
  device_tokens: []
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'benhnhan'
});
benhnhanSchema.plugin(mongoosePaginate);
export default mongoose.model('BenhNhan', benhnhanSchema);
