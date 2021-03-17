import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const thongtinkhithaiSchema = new Schema({
  phieudieutra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhieuDieuTra',
    required: true
  },
  klkhithai: {
    type: Number,
    required: false
  },
  soluongnguonthai: {
    type: Number,
    required: false
  },
  
  quantrackhithai: {
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
    type: String
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
  
  kinhdo1: {
    type: String,
    required: false
  },
  vydo1: {
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
  kinhdo3: {
    type: String,
    required: false
  },
  vydo3: {
    type: String,
    required: false
  },
  kinhdo4: {
    type: String,
    required: false
  },
  vydo4: {
    type: String,
    required: false
  },

  buitongtruockhithai: {
    type: Number,
    required: false
  },
  so2truockhithai: {
    type: Number,
    required: false
  },
  no2truockhithai: {
    type: Number,
    required: false
  },
  cotruockhithai: {
    type: Number,
    required: false
  },
  hoiaxittruockhithai: {
    type: Number,
    required: false
  },
  pbtruockhithai: {
    type: Number,
    required: false
  },
  cdtruockhithai: {
    type: Number,
    required: false
  },

  buitongsaukhithai: {
    type: Number,
    required: false
  },
  so2saukhithai: {
    type: Number,
    required: false
  },
  no2saukhithai: {
    type: Number,
    required: false
  },
  cosaukhithai: {
    type: Number,
    required: false
  },
  hoiaxitsaukhithai: {
    type: Number,
    required: false
  },
  pbsaukhithai: {
    type: Number,
    required: false
  },
  cdsaukhithai: {
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
thongtinkhithaiSchema.plugin(mongoosePaginate);
export default mongoose.model('ThongTinKhiThai', thongtinkhithaiSchema);
