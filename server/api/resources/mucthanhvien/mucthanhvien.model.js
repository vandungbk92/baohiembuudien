import number from 'joi/lib/types/number';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const mucthanhvienSchema = new Schema({

    id: {
    type: String,
    required: true
  },

  tenmuc: {
    type: String,
    required: true,
  },

  mota:{
      type: String,
  },

  uudai:{
      type: Number,

  },

  tgbatdau:{
      type: Date,
      required: true
  },

  tgketthuc: {
        type: Date,
        required: true
  },

  dongia:  {
    type: Number,
  },

  trangthai: {
    type: String,
  },

  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
mucthanhvienSchema.plugin(mongoosePaginate);
export default mongoose.model('MucThanhVien', mucthanhvienSchema);
