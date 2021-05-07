import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const jobSchema = new Schema({
    id:{
        type:String
    }
  ,
  tencongviec:
  {
    type: String,
    required: true
  },
  loaicv:
  {
    type: String,
    required: true
  },
  trangthai:
  {
    type: Boolean,
    default:true
    
  }, 
  tgbatdau:
  {
    type: Date,
    require:true
 
  },
  tgketthuc:
  {
    type:Date,
    require:true

  },

  trangthai_id: {
    type: mongoose.Schema.Types.ObjectId,
   
    ref: 'Job'
  },
  
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
jobSchema.plugin(mongoosePaginate);
export default mongoose.model('Job', jobSchema);
