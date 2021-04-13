import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const donvitinhSchema = new Schema({
  tendonvi: {
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
donvitinhSchema.plugin(mongoosePaginate);
export default mongoose.model('DonViTinh', donvitinhSchema);
