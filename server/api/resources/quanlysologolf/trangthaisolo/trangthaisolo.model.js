import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const trangthaisoloSchema = new Schema({
  tentrangthai: {
    type: String,
    required: true,
  },
  mota: { type: String },
  thutu: { type: String },

  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
trangthaisoloSchema.plugin(mongoosePaginate);

export default mongoose.model('TrangThaiSoLo', trangthaisoloSchema);
