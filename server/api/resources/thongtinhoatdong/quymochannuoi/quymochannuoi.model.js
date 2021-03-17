import mongoose from 'mongoose';

const { Schema } = mongoose;
const quymochannuoiSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },

  daigiasuc_soluong: {
    type: Number
  },
  daigiasuc_ghichu: {
    type: String
  },

  tieugiasuc_soluong: {
    type: Number
  },
  tieugiasuc_ghichu: {
    type: String
  },

  giacam_soluong: {
    type: Number
  },
  giacam_ghichu: {
    type: String
  },

  thuycam_soluong: {
    type: Number
  },
  thuycam_ghichu: {
    type: String
  },

  vatnuoikhac_soluong: {
    type: Number
  },
  vatnuoikhac_ghichu: {
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
  collection: 'quymochannuoi'
});
export default mongoose.model('QuyMoChanNuoi', quymochannuoiSchema);
