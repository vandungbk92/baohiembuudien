import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const khunggiosangolfSchema = new Schema({
  mota: { type: String },
  thutu: { type: String },
  khunggio: { type: String , required: true},
  giatien: { type: Number },
  ca : { type: String },
  // thu:[],
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
khunggiosangolfSchema.plugin(mongoosePaginate);

export default mongoose.model('KhungGioSanGolf', khunggiosangolfSchema);
