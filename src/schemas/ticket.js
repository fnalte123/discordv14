const { Schema, model } = require("mongoose");
const ticketSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  discordid: String,
  ticketnummer: String,
});

module.exports = model("Ticket", ticketSchema, "tickets");
