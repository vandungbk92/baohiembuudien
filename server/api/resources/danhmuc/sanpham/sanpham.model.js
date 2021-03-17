import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const sanphamSchema = new Schema({
  tensanpham: {
    type: String,
    required: true
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
sanphamSchema.plugin(mongoosePaginate);
export default mongoose.model('SanPham', sanphamSchema);
