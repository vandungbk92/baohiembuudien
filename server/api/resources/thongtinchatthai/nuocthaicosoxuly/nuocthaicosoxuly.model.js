import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const nuocthaicosoxulySchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  klnuocthaisinhhoat: {
    type: Number,
    required: false
  },
  congsuatxuly_ntsh: {
    type: Number,
    required: false
  },
  hieusuatxuly_ntsh:{
    type: Number,
    required: false
  },
  congnghexuly_ntsh: {
    type: String,
    required: false
  },
  klnuocthaicongnghiep: {
    type: Number,
    required: false
  },
  congsuatxuly_ntcn: {
    type: Number,
    required: false
  },
  hieusuatxuly_ntcn:{
    type: Number,
    required: false
  },
  congnghexuly_ntcn: {
    type: String,
    required: false
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
  
  phtruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  bodtruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  tsstruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  nh4truoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  no3truoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  po4truoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  coliformtruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  tongntruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  tongcodtruoctaptrung_ntsh: {
    type: Number,
    required: false
  },
  phsautaptrung_ntsh: {
    type: Number,
    required: false
  },
  bodsautaptrung_ntsh: {
    type: Number,
    required: false
  },
  tsssautaptrung_ntsh: {
    type: Number,
    required: false
  },
  nh4sautaptrung_ntsh: {
    type: Number,
    required: false
  },
  no3sautaptrung_ntsh: {
    type: Number,
    required: false
  },
  po4sautaptrung_ntsh: {
    type: Number,
    required: false
  },
  coliformsautaptrung_ntsh: {
    type: Number,
    required: false
  },
  tongnsautaptrung_ntsh: {
    type: Number,
    required: false
  },
  tongcodsautaptrung_ntsh: {
    type: Number,
    required: false
  },
  phtruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  bodtruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  tsstruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  nh4truoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongptruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  daumotruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  coliformtruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongntruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongcodtruoctaptrung_ntcn: {
    type: Number,
    required: false
  },
  phsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  bodsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  tsssautaptrung_ntcn: {
    type: Number,
    required: false
  },
  nh4sautaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongpsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  daumosautaptrung_ntcn: {
    type: Number,
    required: false
  },
  coliformsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongnsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  tongcodsautaptrung_ntcn: {
    type: Number,
    required: false
  },
  thutu: {
    type: Number
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'nuocthaicosoxuly'

});

nuocthaicosoxulySchema.plugin(mongoosePaginate);
export default mongoose.model('NuocThaiCoSoXuLy', nuocthaicosoxulySchema);
