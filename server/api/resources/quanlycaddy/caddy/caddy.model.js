import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const caddySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  taikhoan:
  {
    type: String,
    required: true
  },
  matkhau:
  {
    type: String,
    required: true
  },
  hoten:
  {
    type: String,
    required: true
  }, 
  diachi:
  {
    type: String,
 
  },
  sdt:
  {
    type: Number,

  },
  email:
  {
    type: String,
 
  },
  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TrangThaiCaddy'
  },
  trinhdohocvan:
  {
    type: String,
    required: true
  },
  kinhnghiem:
  {
    type: String,
    required: true
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
caddySchema.plugin(mongoosePaginate);
export default mongoose.model('Caddy', caddySchema);
