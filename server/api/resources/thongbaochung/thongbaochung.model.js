import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const thongbaochungSchema = new Schema({
  user_id: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  link_push_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'loaithongbao'
  },
  loaithongbao: {
    type: String,
    required: true,
    enum: ['TinTuc', 'HuongDan','LichHen']
  }, // 1 Tin tức, 2 Hướng dẫn
  is_deleted: {type: Boolean, default: false},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
thongbaochungSchema.plugin(mongoosePaginate);
export default mongoose.model('ThongBaoChung', thongbaochungSchema);
