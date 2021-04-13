import number from 'joi/lib/types/number';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const fnbSchema = new Schema({

    id: {
    type: String,
    required: true
  },

  tenmon: {
    type: String,
    required: true,
  },

  mota:{
      type: String,
  },



  dongia:  {
    type: Number,
  },

  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TrangThaiFnB'
  },

  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
fnbSchema.plugin(mongoosePaginate);
export default mongoose.model('FnB', fnbSchema);
