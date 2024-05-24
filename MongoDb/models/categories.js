import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from "mongoose";
var Schema = mongoose.Schema;

let categoriesSchema = new Schema({
  title: String,
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "categories" }
});

categoriesSchema.plugin(mongoosePaginate);

export default mongoose.model("Categories", categoriesSchema);
