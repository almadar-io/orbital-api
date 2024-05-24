import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
const saltRounds = 10;

var Schema = mongoose.Schema;
let authSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  password: {
    type: String,
    set: function(newValue) {
      return bcrypt.hashSync(newValue, saltRounds);
    }
  },
  resetPasswordToken: {
    type: String,
    set: function() {
      const buf = Buffer.alloc(10);
      crypto.randomFillSync(buf, 5);
      let randToken = buf.toString("hex");
      return randToken;
    }
  },
  confirmEmailToken: {
    type: String,
    default: function() {
      const buf = Buffer.alloc(10);
      crypto.randomFillSync(buf, 5);
      let randToken = buf.toString("hex");
      return randToken;
    }
  },
  jwtToken: String,
  googleId: String,
  googleAccessToken: String,
  googleRefreshToken: String,
  googleProfile: Object,
  facebookId: String,
  facebookAccessToken: String,
  facebookRefreshToken: String,
  facebookProfile: Object,
  twitterId: String,
  twitterAccessToken: String,
  twitterRefreshToken: String,
  twitterProfile: Object,
  createdAt: { type: Date, default: Date.now }
});
authSchema.plugin(findOrCreate);

authSchema.methods.verifyPassword = function(password) {
  if (bcrypt.compareSync(password, this.password)) {
    return this;
  }
  return false;
};

// set up a mongoose model
export default mongoose.model("Auth", authSchema);
