import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const nhienlieutieuthuSchema = new Schema({
  loainhienlieu: {
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
  },
  collection: 'dmnhienlieu'
});
nhienlieutieuthuSchema.plugin(mongoosePaginate);
export default mongoose.model('NhienLieuTieuThu', nhienlieutieuthuSchema);
