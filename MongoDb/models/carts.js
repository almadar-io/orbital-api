import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
var Schema = mongoose.Schema;

let cartsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "carts" }
});

cartsSchema.plugin(mongoosePaginate);

export default mongoose.model("Cart", cartsSchema);
