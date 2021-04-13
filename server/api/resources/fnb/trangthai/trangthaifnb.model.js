import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const trangthaiSchema = new Schema({
  tentrangthai: {
    type: String,
    required: true,
  },
  mota: { type: String },
  thutu: { type: Number },

  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
trangthaiSchema.plugin(mongoosePaginate);

export default mongoose.model('TrangThai', trangthaiSchema);
