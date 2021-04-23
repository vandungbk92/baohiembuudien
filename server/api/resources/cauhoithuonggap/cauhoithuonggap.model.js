import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const cauhoithuonggapSchema = new Schema({
  cauhoi: { type: String },
  traloi: { type: String },
  nguoitao_id: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
cauhoithuonggapSchema.plugin(mongoosePaginate);

export default mongoose.model('CauHoiThuongGap', cauhoithuonggapSchema);
