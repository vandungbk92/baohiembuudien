import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const proshopSchema = new Schema({

  tenhang: {
    type: String,
    required: true
  },
  soluong: {
    type: Number,
    required: true
  },
  donvitinh_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'DonViTinh'
  }, 
  dongia: {
    type: Number,
    required: true,

    
  }, 
  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TrangThai'
  },

  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
proshopSchema.plugin(mongoosePaginate);
export default mongoose.model('ProShop', proshopSchema);
