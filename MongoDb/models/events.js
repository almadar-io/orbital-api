var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import Joi from 'joi';
import mongoosePaginate from 'mongoose-paginate-v2';

const eventJoiSchema = Joi.object()
  .keys({
    startDateTime: Joi.date(),
    endDateTime: Joi.date(),
    created: Joi.date()
  })
  .unknown();

// set up a mongoose model
let eventSchema = new Schema({
  title: String,
  description: String,
  startDateTime: { type: Date, default: Date.now() },
  endDateTime: { type: Date, default: Date.now() },
  isRecurring: { type: Boolean, default: false },
  recurringRule: Object,
  image: String,
  lat: Number,
  long: Number,
  allDay: { type: Boolean, default: false },
  gallery: Array,
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  isASeed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  resource: { type: String, default: "events" }
});

eventSchema.plugin(mongoosePaginate);

eventSchema.methods.joiValidate = function(obj) {
  return Joi.validate(obj, eventJoiSchema);
};

eventSchema.statics.joiValidate = function(obj) {
  return Joi.validate(obj, eventJoiSchema);
};
export default eventSchema;
