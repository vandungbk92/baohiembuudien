import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const dmdonviduocdieutraSchema = new Schema({

  madanhmuc: {
    type: String,
    required: true
  },
  tendanhmuc: {
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
dmdonviduocdieutraSchema.plugin(mongoosePaginate);
export default mongoose.model('DMDonViDuocDieuTra', dmdonviduocdieutraSchema);
