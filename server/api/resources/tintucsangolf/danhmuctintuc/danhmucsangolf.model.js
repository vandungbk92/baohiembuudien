import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const danhmuctintucSchema = new Schema({
  ten: {
    type: String,
    required: true,
  },
  mota: { type: String },
  thutu: { type: Number },
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
danhmuctintucSchema.plugin(mongoosePaginate);

export default mongoose.model('DanhmucTintuc', danhmuctintucSchema);
