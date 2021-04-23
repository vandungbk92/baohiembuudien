import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const huongdanSchema = new Schema({
  tieude: {
    type: String,
    required: true,
  },
  tieudephu: { type: String },
  avatar: { type: String },
  mota: { type: String },
  thutu: { type: Number },
  noidung: { type: String },
  trangchu: { type: Boolean },
  sothongbao: { type: Number },
  danhmuc_id: {
    ref: 'DanhmucHuongDan',
    type: mongoose.Schema.Types.ObjectId,
  },
  nguoitao_id: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
huongdanSchema.plugin(mongoosePaginate);

export default mongoose.model('HuongDan', huongdanSchema);
