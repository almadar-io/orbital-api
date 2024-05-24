import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// set up a mongoose model
let settingsSchema = new Schema({
  key: String,
  fields: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "settings" }
});
export default settingsSchema;
