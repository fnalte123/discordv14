const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  discordid: String,
  balance: { type: Number, default: 100 },
  discordname: String,
});

module.exports = model("Users", userSchema, "users");
