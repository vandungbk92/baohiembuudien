import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const {Schema} = mongoose;
const dmdichvuSchema = new Schema({
  _id: {type: Number, required: true},
  manhomdichvu: {
    type: mongoose.Schema.Types.String,
    ref: 'DmNhomDichVu',
  },
  maloaidichvu: {
    type: mongoose.Schema.Types.Number,
    ref: 'DmLoaiDichVu',
  },
  madonvitinh: {
    type: mongoose.Schema.Types.Number,
    ref: 'DmDonViTinh',
  },
  manhombh: {
    type: mongoose.Schema.Types.Number,
    ref: 'DmNhomBH',
  },
  tendichvu: {
    type: String,
  },
  danhgia: {
    type: Boolean, 
    default: false,
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'dmdichvu'
});
dmdichvuSchema.plugin(mongoosePaginate);
export default mongoose.model('DmDichVu', dmdichvuSchema);
