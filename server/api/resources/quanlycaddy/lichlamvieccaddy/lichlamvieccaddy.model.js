import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const lichlamvieccaddySchema = new Schema({
  tungay: {
    type: Date,
    required: true,
  },
  denngay: {
    type: Date,
    required: false,
  },
  ghichu: { type: String },
  laplai: { type: String },
  cangay:[],
  casang:[],
  cachieu:[],
  nghi:[],
  caddy_id: {
    type: mongoose.Schema.Types.ObjectId,

    ref: 'Caddy'
  },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
lichlamvieccaddySchema.plugin(mongoosePaginate);

export default mongoose.model('LichLamViecCaddy', lichlamvieccaddySchema);
