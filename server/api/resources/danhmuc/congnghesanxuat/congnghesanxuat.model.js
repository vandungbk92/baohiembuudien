import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const congnghesanxuatSchema = new Schema({
  tencongnghesx: {
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
  collection: 'dmcongnghesx'
});
congnghesanxuatSchema.plugin(mongoosePaginate);
export default mongoose.model('CongNgheSanXuat', congnghesanxuatSchema);
