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
  thu2 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  thu3 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  thu4 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  thu5 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  thu6 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  thu7 :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  chunhat :[
    {
      ref: 'KhungGioSanGolf',
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  malich: { type: String },
  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
lichsangolfSchema.plugin(mongoosePaginate);

export default mongoose.model('LichSanGolf', lichsangolfSchema);
