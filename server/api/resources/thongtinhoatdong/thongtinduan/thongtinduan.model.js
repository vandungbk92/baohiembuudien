import mongoose from 'mongoose';

const { Schema } = mongoose;
const thongtinduanSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  duandautu: String,
  duanhoatdong: String,
  dientichdat: String,
  dientichdatlapday: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'thongtinduan'
});
export default mongoose.model('ThongTinDuAn', thongtinduanSchema);
