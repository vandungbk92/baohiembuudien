import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const hoachatSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  hoachatsudung_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HoaChatSuDung',
    required: true
  },
  donvi_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonVi',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  luongsudung: {
    type: Number
  },
  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'hoachat'
});
hoachatSchema.plugin(mongoosePaginate);
export default mongoose.model('HoaChat', hoachatSchema);
