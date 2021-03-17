import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const quymohoatdongchema = new Schema({
  tensanpham: {
    type: String,
    required: true
  },
  congnghesanxuat: {
    type: Number,
    required: false
  },
  congsuatthietke: {
    type: Number,
    required: false
  },
  congsuathoatdong: {
    type: Number,
    required: false
  },
  thutu: {
    type: Number
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
quymohoatdongchema.plugin(mongoosePaginate);
export default mongoose.model('QuyMoHoatDong', quymohoatdongchema);
