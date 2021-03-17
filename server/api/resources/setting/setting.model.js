import mongoose from 'mongoose';

const { Schema } = mongoose;
const settingSchema = new Schema({
  tendonvi: {
    type: String
  },
  daidien: {
    type: String
  },
  chucvu: {
    type: String
  },
  diachi: {
    type: String
  },
  tinhdieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TinhThanh',
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
export default mongoose.model('Setting', settingSchema);
