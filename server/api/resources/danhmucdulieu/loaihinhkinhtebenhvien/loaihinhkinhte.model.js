import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const loaihinhkinhteSchema = new Schema({
  tenloaihinh: {
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
loaihinhkinhteSchema.plugin(mongoosePaginate);
export default mongoose.model('LoaiHinhKinhTe', loaihinhkinhteSchema);
