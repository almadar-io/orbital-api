import mongoose from "mongoose";
var Schema = mongoose.Schema;

// set up a mongoose model
let permissionsSchema = new Schema({
  key: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "acl" }
});
export default permissionsSchema;
