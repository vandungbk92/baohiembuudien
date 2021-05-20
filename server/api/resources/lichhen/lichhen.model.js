import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const lichhenSchema = new Schema({
  ngayhen : {
    type : Date,
    required: true
  },
  caddy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caddy'
  },
  khachchoi_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  solo : {type : String},
  khunggio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KhungGioSanGolf'
  },
  trangthai : {type : String}, // Đang chờ, đã duyệt, đã hoàn thành
  voucher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  songuoichoi : {type :Number},

  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
lichhenSchema.plugin(mongoosePaginate);

export default mongoose.model('LichHen', lichhenSchema);
