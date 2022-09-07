require("dotenv").config();
const { token, databaseToken} = process.env;
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { connect } = require("mongoose")

const client = new Client({ intents: 131071 });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.modals = new Collection();
client.color = "#36393F";



const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
connect(databaseToken);
(async () => {
  await connect(databaseToken).catch(console.error)
})();
