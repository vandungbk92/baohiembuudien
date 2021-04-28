import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const {Schema} = mongoose;
const thanhtoanSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  makcb: {type: String, ref: 'DangKy'},
  sophieu: {type: String},
  ngay: {type: Date},
  manv: {type: Number, ref: 'DmNhanVien'},
  madieutri: {type: Number},
  makhambenh: {
    type: Number,
    ref: 'KhamBenh'
  },
  makk: {
    type: Number,
    ref: 'DmKK'
  },
  maphong: {
    type: Number,
    ref: 'DmPhong'
  },
  thanhtoanke: {type: Boolean},
  chiphicu: {type: Boolean},
  ngoaigio: {type: Boolean},
  capcuu: {type: Boolean},

  ylenhcapcuu: {type: String},
  ylenhkhac: {type: String},
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'thanhtoan'
});
thanhtoanSchema.plugin(mongoosePaginate);
export default mongoose.model('ThanhToan', thanhtoanSchema);
