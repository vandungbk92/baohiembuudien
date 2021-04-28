import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const thanhtoanctSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  mathanhtoan: {type: Number, ref: 'ThanhToan'},
  mahh: {type: Number, ref: 'DmDichVu'},
  makhoan: {type: Number, ref: 'DmKhoan'},
  makk: {type: Number, ref: 'DmKK'},
  stt: {type: Number},

  dongia: {type: Number},
  dongiabhyt: {type: Number},
  soluong: {type: Number},
  soluongst: {type: Number},
  tyle: {type: Number},
  thanhtien: {type: Number},
  thanhtienst: {type: Number},
  tienbh: {type: Number},
  tienbn: {type: Number},
  tienbncct: {type: Number},
  ladichvu: {type: Boolean},
  cotienchenh: {type: Boolean},
  tienchenhdm: {type: Number},
  pthuong: {type: Number},
  ghichu: {type: Number},
  daduyet: {type: Boolean},
  tyletren100pt: {type: Boolean},
  thanhtienbh: {type: Number},
  thanhtienbhst: {type: Number},
  soluonghong: {type: Number},
  is_deleted: {type: Boolean, default: false}
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'thanhtoanct'
});
thanhtoanctSchema.plugin(mongoosePaginate);
export default mongoose.model('ThanhToanCT', thanhtoanctSchema);
