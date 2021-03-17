import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const ketluanthanhtraSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  soketluan: {
    type: String,
    required: false
  },
  coquanbanhanh: {
    type: String,
    required: false
  },
  thoigianbanhanh: {
    type: Date,
    required: false
  },
  hanhvivipham: [{
    type: String
  }],
  phibvmt: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // riêng phiếu 7
  khokhan: {
    type: String,
  },
  kiennghi: {
    type: String,
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'ketluanthanhtra'
});
ketluanthanhtraSchema.plugin(mongoosePaginate);
export default mongoose.model('KetLuanThanhTra', ketluanthanhtraSchema);
