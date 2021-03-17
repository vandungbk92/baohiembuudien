import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const loaihinhthuchienSchema = new Schema({
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
loaihinhthuchienSchema.plugin(mongoosePaginate);
export default mongoose.model('LoaiHinhThucHien', loaihinhthuchienSchema);
