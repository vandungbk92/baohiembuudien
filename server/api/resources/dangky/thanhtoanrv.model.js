import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const thanhtoanrvSchema = new Schema({
  _id: { type: String, required: true },
  ngaytt: { type: Date },
  datt: { type: Boolean },
  is_deleted: {type: Boolean, default: false}
},{
  collection: 'thanhtoanrv'
});
thanhtoanrvSchema.plugin(mongoosePaginate);
export default mongoose.model('ThanhToanRV', thanhtoanrvSchema);
