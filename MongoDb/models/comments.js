import mongoose from "mongoose";
var Schema = mongoose.Schema;
import mongoosePaginate from 'mongoose-paginate-v2';

let commentsSchema = new Schema({
  title: String,
  name: String,
  parent: { type: Schema.Types.ObjectId, ref: "Comments" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "comments" }
});

commentsSchema.plugin(mongoosePaginate);

export default commentsSchema
