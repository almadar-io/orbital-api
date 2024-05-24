import mongoose from "mongoose";
var Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate-v2';

// set up a mongoose model
let kernelSchema = new Schema({
  title: String,
  body: { type: Object, default: {} },
  tags: { type: Array, default: [] },
  status: String,
  gallery: Array,
  image: String,
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "kernel" }
});
kernelSchema.plugin(mongoosePaginate);
export default mongoose.model("Kernel", kernelSchema);
