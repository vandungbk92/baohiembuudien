import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const xulynuocthaiSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  hethongthugom: {
    type: String
  },
  phandong: {
    type: String,
    required: false
  },
  khuxuly:{
    type: String,
    required: false
  },
  congsuattram: {
    type: Number,
    required: false
  },
  congnghexuly: {
    type: String,
    required: false
  },
  kinhdo: {
    type: String,
    required: false
  },
  vydo: {
    type: String,
    required: false
  },
  noitiepnhan: {
    type: String,
    required: false
  },
  tennoitiepnhan: {
    type: String,
    required: false
  },
  nhanlucvanhanh: {
    type: String,
    required: false
  },
  baotrihethong: {
    type: String,
    required: false
  },
  solanbaotri: {
    type: Number,
    required: false
  },
  baotri: {
    type: String,
    required: false
  },
  donvibaotri: {
    type: String,
    required: false
  },

  phtruoctaptrung: {
    type: Number,
    required: false
  },
  bodtruoctaptrung: {
    type: Number,
    required: false
  },
  tsstruoctaptrung: {
    type: Number,
    required: false
  },
  nh4truoctaptrung: {
    type: Number,
    required: false
  },
  no3truoctaptrung: {
    type: Number,
    required: false
  },
  po4truoctaptrung: {
    type: Number,
    required: false
  },
  daumotruoctaptrung: {
    type: Number,
    required: false
  },
  coliformtruoctaptrung: {
    type: Number,
    required: false
  },
  phsautaptrung: {
    type: Number,
    required: false
  },
  bodsautaptrung: {
    type: Number,
    required: false
  },
  tsssautaptrung: {
    type: Number,
    required: false
  },
  nh4sautaptrung: {
    type: Number,
    required: false
  },
  no3sautaptrung: {
    type: Number,
    required: false
  },
  po4sautaptrung: {
    type: Number,
    required: false
  },
  daumosautaptrung: {
    type: Number,
    required: false
  },
  coliformsautaptrung: {
    type: Number,
    required: false
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
xulynuocthaiSchema.plugin(mongoosePaginate);
export default mongoose.model('XuLyNuocThai', xulynuocthaiSchema);
