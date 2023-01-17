const { Schema, model } = require("mongoose");
const streamerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  streamername: String,
  IsLive: false,
});

module.exports = model("Streamers", streamerSchema, "streamers");
