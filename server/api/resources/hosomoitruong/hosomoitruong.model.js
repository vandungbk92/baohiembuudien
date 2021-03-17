import mongoose from 'mongoose';

const { Schema } = mongoose;
const hosomoitruongSchema = new Schema({

  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  loaiphieu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhieu'
  },
  quyetdinhpheduyet_soqd: {
    type: String
  },
  quyetdinhpheduyet_coquan: {
    type: String
  },
  quyetdinhpheduyet_thoigian: {
    type: Date
  },
  quyetdinhpheduyet_ghichu: {
    type: String
  },
  xacnhanhoanthanh_soqd: {
    type: String
  },
  xacnhanhoanthanh_coquan: {
    type: String
  },
  xacnhanhoanthanh_thoigian: {
    type: Date
  },
  xacnhanhoanthanh_ghichu: {
    type: String
  },

  danhmuckiemsoat_soqd: {
    type: String
  },
  danhmuckiemsoat_coquan: {
    type: String
  },
  danhmuckiemsoat_thoigian: {
    type: Date
  },
  danhmuckiemsoat_ghichu: {
    type: String
  },
  dmcsonhiemcao_soqd: {
    type: String
  },
  dmcsonhiemcao_coquan: {
    type: String
  },
  dmcsonhiemcao_thoigian: {
    type: Date
  },
  dmcsonhiemcao_ghichu: {
    type: String
  },

  qddmmonhiemcao_soqd: {
    type: String
  },
  qddmmonhiemcao_coquan: {
    type: String
  },
  qddmmonhiemcao_thoigian: {
    type: Date
  },
  qddmmonhiemcao_ghichu: {
    type: String
  },
  qdxnonhiemcao_soqd: {
    type: String
  },
  qdxnonhiemcao_coquan: {
    type: String
  },
  qdxnonhiemcao_thoigian: {
    type: Date
  },
  qdxnonhiemcao_ghichu: {
    type: String
  },
  dmcsonhiemnt_soqd: {
    type: String
  },
  dmcsonhiemnt_coquan: {
    type: String
  },
  dmcsonhiemnt_thoigian: {
    type: Date
  },
  dmcsonhiemnt_ghichu: {
    type: String
  },

  qddmonhiemnt_soqd: {
    type: String
  },
  qddmonhiemnt_coquan: {
    type: String
  },
  qddmonhiemnt_thoigian: {
    type: Date
  },
  qddmonhiemnt_ghichu: {
    type: String
  },
  qdxnonhiemnt_soqd: {
    type: String
  },
  qdxnonhiemnt_coquan: {
    type: String
  },
  qdxnonhiemnt_thoigian: {
    type: Date
  },
  qdxnonhiemnt_ghichu: {
    type: String
  },
  giayphepxathai_soqd: {
    type: String
  },
  giayphepxathai_coquan: {
    type: String
  },
  giayphepxathai_thoigian: {
    type: Date
  },
  giayphepxathai_ghichu: {
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
  collection: 'hosomoitruong'
});
export default mongoose.model('HoSoMoiTruong', hosomoitruongSchema);
