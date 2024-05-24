var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate-v2';

let tagsSchema = new Schema({
  title: String,
  name: String,
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "tags" }
});

tagsSchema.plugin(mongoosePaginate);

export default tagsSchema