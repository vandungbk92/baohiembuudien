import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const loaiphieuSchema = new Schema({
  tenphieu: {
    type: String,
    required: true
  },
  tenphieu_viettat: {
    type: String,
    required: false
  },
  maphieu: {
    type: String,
    required: true
  },
  mota: {
    type: String,
    //required: true,
  },
  link: {
    type: String
  },
  thutu: {
    type: Number
  },
  files: [],
  thongtindonvi:[],
  thongtinchatthai:[],
  hoatdongdonvi:[],
  ketluanthanhtra:[],
  label_hoatdong: String,
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
loaiphieuSchema.plugin(mongoosePaginate);
export default mongoose.model('LoaiPhieu', loaiphieuSchema);
