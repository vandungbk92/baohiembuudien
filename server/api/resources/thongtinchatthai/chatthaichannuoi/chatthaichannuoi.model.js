import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const chatthaichannuoiSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  klphatsinh: {
    type: Number,
    required: false
  },
  kltuxuly: {
    type: Number,
    required: false
  },
  klthuexuly: {
    type: Number,
    required: false
  },
  klchonlap: {
    type: Number,
    required: false
  },
  kldot: {
    type: Number,
    required: false
  },
  kltaiche: {
    type: Number,
    required: false
  },
  klchebien: {
    type: Number,
    required: false
  },
  klkhac: {
    type: Number,
    required: false
  },
  cosotiepnhan: {
    type: String
  },
  thontotiepnhan: {
    type: String,
    required: false
  },
  tinhthanhtiepnhan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TinhThanh',
  },
  quanhuyentiepnhan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuanHuyen',
  },
  phuongxatiepnhan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhuongXa',
  },
  thutu: {
    type: Number
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
chatthaichannuoiSchema.plugin(mongoosePaginate);
export default mongoose.model('ChatThaiChanNuoi', chatthaichannuoiSchema);
