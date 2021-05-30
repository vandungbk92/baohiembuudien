import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const danhgiaSchema = new Schema(
  {
    diem: {
      type: Number,
      default: 0,
      require: true
    },
    noidung: {
      type: String,
      default: "",
      require: true
    },
    danhgia: {
      type: Boolean,
      default: false
    },
    lichhen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LichHen"
    },
    is_deleted: { type: Boolean, default: false, select: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
danhgiaSchema.plugin(mongoosePaginate);

export default mongoose.model("DanhGia", danhgiaSchema);
