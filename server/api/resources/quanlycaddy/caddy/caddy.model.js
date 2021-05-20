import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const caddySchema = new Schema({

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
    require:true
 
  },
  sdt:
  {
    type:String,
    require:true

  },
  email:
  {
    type: String,
    require:true
  },
  // trangthai_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'TrangThaiCaddy'
  // },
  trangthailamviec :
    {
      type: Number,
    },
  macaddy:
  {
    type: String,
    required: false
  },
  avatar: { type: String },
  kinhnghiem:
  {
    type: String,
    required: false
  },
  active: { type: Boolean, default: true },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
caddySchema.plugin(mongoosePaginate);
export default mongoose.model('Caddy', caddySchema);
