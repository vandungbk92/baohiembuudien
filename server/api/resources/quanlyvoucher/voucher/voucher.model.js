import number from 'joi/lib/types/number';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const voucherSchema = new Schema({

    id: {
    type: String,
    required: true
  },

  tenvoucher: {
    type: String,
    required: true,
  },

  mota:{
      type: String,
  },

  muchoivien:{
      type: String,
    require: true
  },
  
  diemtichluy: {
    type: String
  },

  tgbatdau:{
      type: Date,

  },

  tgketthuc: {
        type: Date,

  },

  soluongvoucher:  {
    type: Number,
    required:true,
  },
 
  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TrangThaiVoucher'
  },
  solo_id:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Solo'
  }],

  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
voucherSchema.plugin(mongoosePaginate);
export default mongoose.model('Voucher', voucherSchema);
