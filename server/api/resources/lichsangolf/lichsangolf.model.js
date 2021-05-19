import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const lichsangolfSchema = new Schema({
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
  thu2: { type: String },
  thu3: { type: String },
  thu4: { type: String },
  thu5: { type: String },
  thu6: { type: String },
  thu7: { type: String },
  chunhat: { type: String },
  malich: { type: String },
  khunggio: { type: String },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
lichsangolfSchema.plugin(mongoosePaginate);

export default mongoose.model('LichSanGolf', lichsangolfSchema);
