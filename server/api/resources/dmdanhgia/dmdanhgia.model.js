import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const {Schema} = mongoose;
const dmdanhgiaSchema = new Schema({
  tendanhgia: {
    type: String
  },
  sothutu: { type: Number },
  trangthai: {type: Boolean, default: true},
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'dmdanhgia'
});
dmdanhgiaSchema.plugin(mongoosePaginate);
export default mongoose.model('DmDanhGia', dmdanhgiaSchema);
