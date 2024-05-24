var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate-v2';

let categoriesSchema = new Schema({
  title: String,
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "categories" }
});

categoriesSchema.plugin(mongoosePaginate);

export default mongoose.model("Categories", categoriesSchema);
