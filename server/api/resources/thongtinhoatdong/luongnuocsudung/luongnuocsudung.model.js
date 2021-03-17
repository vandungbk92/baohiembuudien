import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const luongnuocsudungSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  nuocmay_sudung: {
    type: Number
  },
  nuocmay_mucdich: {
    type: String
  },
  nuocngam_sudung: {
    type: Number
  },
  nuocngam_mucdich: {
    type: String
  },
  nuocmat_sudung: {
    type: Number
  },
  nuocmat_mucdich: {
    type: String
  },
  nuockhac_sudung: {
    type: Number
  },
  nuockhac_mucdich: {
    type: String
  },
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
  collection: 'luongnuocsudung'
});
luongnuocsudungSchema.plugin(mongoosePaginate);
export default mongoose.model('LuongNuocSuDung', luongnuocsudungSchema);
