const { Schema, model } = require("mongoose");
const channelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  twitchchannel: String,
});

module.exports = model("GuildChannels", channelSchema, "guildchannels");
