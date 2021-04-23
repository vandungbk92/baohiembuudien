import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const thongtinchungSchema = new Schema({
    duongdaynong: { type: String},
    email: { type: String},
    logo: { type: String},
    diachi: {type: String},
    songayhenkham: {type: Number},
    hinhanh: []
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

thongtinchungSchema.plugin(mongoosePaginate);
export default mongoose.model('ThongTinChung', thongtinchungSchema);
