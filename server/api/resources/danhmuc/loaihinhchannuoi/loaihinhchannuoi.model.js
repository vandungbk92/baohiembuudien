import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const loaihinhchannuoiSchema = new Schema({
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
loaihinhchannuoiSchema.plugin(mongoosePaginate);
export default mongoose.model('LoaiHinhChanNuoi', loaihinhchannuoiSchema);