import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const quymobenhvienSchema = new Schema({
  tenquymo: {
    type: String,
    required: true
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
quymobenhvienSchema.plugin(mongoosePaginate);
export default mongoose.model('QuyMoBenhVien', quymobenhvienSchema);
