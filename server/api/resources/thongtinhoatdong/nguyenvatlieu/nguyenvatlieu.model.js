import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const nguyenvatlieuSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  nguyenvatlieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DMNguyenVatLieu',
    required: true
  },
  donvi_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonVi',
  },
  luongsudung: {
    type: Number
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
  collection: 'nguyenvatlieu'
});
nguyenvatlieuSchema.plugin(mongoosePaginate);
export default mongoose.model('NguyenVatLieu', nguyenvatlieuSchema);
