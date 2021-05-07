import number from 'joi/lib/types/number';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const soloSchema = new Schema({

    id: {
    type: String,
    required: true
  },

  mota:{
      type: String,
  },
  solo:  {
    type: Number,
    require:true
  },
  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TrangThaiSoLo'
  },

  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
soloSchema.plugin(mongoosePaginate);
export default mongoose.model('Solo', soloSchema);
