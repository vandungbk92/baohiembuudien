import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const thongtinungdungSchema = new Schema({
    noidung: { type: String},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

thongtinungdungSchema.plugin(mongoosePaginate);
export default mongoose.model('ThongTinUngDung', thongtinungdungSchema);
