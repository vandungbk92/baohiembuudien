import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const chatthainguyhaiSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  machunguonthai: {
    type: String,
    required: true
  },
  klphatsinhtheodangky: {
    type: Number,
    required: false
  },
  klphatsinhthucte: {
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
  kllodotloquay: {
    type: Number,
    required: false
  },
  klchonlapantoan: {
    type: Number,
    required: false
  },
  klxulydauthai: {
    type: Number,
    required: false
  },
  klxulychatthaidientu: {
    type: Number,
    required: false
  },
  klxulylonung: {
    type: Number,
    required: false
  },
  klhoaran: {
    type: Number,
    required: false
  },
  klxulybongdenthai: {
    type: Number,
    required: false
  },
  kltaicheacquy: {
    type: Number,
    required: false
  },
  klkhac: {
    type: Number,
    required: false
  },
  cosotiepnhan: {
    type: String,
    required: false
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
//Phiếu 6
  klthugom: {
    type: Number,
    required: false
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
chatthainguyhaiSchema.plugin(mongoosePaginate);
export default mongoose.model('ChatThaiNguyHai', chatthainguyhaiSchema);
