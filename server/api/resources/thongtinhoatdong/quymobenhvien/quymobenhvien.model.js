import mongoose from 'mongoose';

const { Schema } = mongoose;
const quymobenhvienSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },

  phongkhoa_soluong: {
    type: Number
  },

  bacsy_soluong: {
    type: Number
  },

  yta_soluong: {
    type: Number
  },

  giuongbenh_soluong: {
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
  collection: 'quymobenhvien'
});
export default mongoose.model('QuyMoBenhVien', quymobenhvienSchema);
