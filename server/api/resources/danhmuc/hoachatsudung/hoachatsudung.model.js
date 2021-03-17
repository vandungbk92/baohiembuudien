import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const hoachatsudungSchema = new Schema({
  tenhoachat: {
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
  collection: 'dmhoachat'
});
hoachatsudungSchema.plugin(mongoosePaginate);
export default mongoose.model('HoaChatSuDung', hoachatsudungSchema);
