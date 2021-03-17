import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const dmnguyenvatlieuSchema = new Schema({
  tennguyenvatlieu: {
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
  },
  collection: 'dmnguyenvatlieu'
});
dmnguyenvatlieuSchema.plugin(mongoosePaginate);
export default mongoose.model('DMNguyenVatLieu', dmnguyenvatlieuSchema);
