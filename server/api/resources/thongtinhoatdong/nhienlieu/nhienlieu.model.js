import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const nhienlieuSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  nhienlieutieuthu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NhienLieuTieuThu',
    required: true
  },
  luongtieuthu: {
    type: Number
  },
  mucdichsudung: {
    type: String
  },
  ghichu: {
    type: String
  },
  is_deleted: { type: Boolean, default: false },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'nhienlieu'
});
nhienlieuSchema.plugin(mongoosePaginate);
export default mongoose.model('NhienLieu', nhienlieuSchema);
