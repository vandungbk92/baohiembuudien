import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const thongtinnuocthaiSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  klnuocthaisinhoat: {
    type: Number,
    required: false
  },
  klntshtuxuly: {
    type: Number,
    required: false
  },
  klntshthuexuly:{
    type: Number,
    required: false
  },
  klnuocthaisanxuat: {
    type: Number,
    required: false
  },
  klntsxtuxuly: {
    type: Number,
    required: false
  },
  klntsxthuexuly: {
    type: Number,
    required: false
  },
  klnuocthaituanhoan: {
    type: Number,
    required: false
  },
  klntthtuxuly: {
    type: Number,
    required: false
  },
  klntththuexuly: {
    type: Number,
    required: false
  },
  soluongnguonthai: {
    type: Number,
    required: false
  },
  quantracnuocthai: {
    type: String,
    required: false
  },
  ketnoitruyendulieu: {
    type: String,
    required: false
  },
  noiketnoithongtin: {
    type: String,
    required: false
  },
  hethongxuly: {
    type: String,
    required: false
  },
  congsuatxuly: {
    type: Number,
    required: false
  },
  hieusuatxuly: {
    type: Number,
    required: false
  },
  congnghexuly: {
    type: String,
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
  kinhdo1: {
    type: String,
    required: false
  },
  vydo1: {
    type: String,
    required: false
  },
  noitiepnhan1: {
    type: String,
    required: false
  },
  tennoitiepnhan1: {
    type: String,
    required: false
  },
  kinhdo2: {
    type: String,
    required: false
  },
  vydo2: {
    type: String,
    required: false
  },
  noitiepnhan2: {
    type: String,
    required: false
  },
  tennoitiepnhan2: {
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
  tongptruoctaptrung: {
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
  tongntruoctaptrung: {
    type: Number,
    required: false
  },
  tongcodtruoctaptrung: {
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
  tongpsautaptrung: {
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
  tongnsautaptrung: {
    type: Number,
    required: false
  },
  tongcodsautaptrung: {
    type: Number,
    required: false
  },
  //Phieu 4
  kqxlnguonthai1: {
    type: String,
    required: false
  },
  kqxlnguonthai2: {
    type: String,
    required: false
  },

  // Phiếu cơ sở y tế
  no3truoctaptrung: {
    type: Number,
    required: false
  },
  no3sautaptrung: {
    type: Number,
    required: false
  },
  po4truoctaptrung: {
    type: Number,
    required: false
  },
  po4sautaptrung: {
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
thongtinnuocthaiSchema.plugin(mongoosePaginate);
export default mongoose.model('ThongTinNuocThai', thongtinnuocthaiSchema);
