import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const hoatdongdonviSchema = new Schema({

  mahoatdong: {
    type: String,
    required: true
  },
  tenhoatdong: {
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
hoatdongdonviSchema.plugin(mongoosePaginate);
export default mongoose.model('HoatDongDonVi', hoatdongdonviSchema);
