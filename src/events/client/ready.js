const chalk = require("chalk");
const mysql = require("mysql2");
require("dotenv").config();
module.exports = {
    name: "ready",
    once: "true",
    async execute(client) {

        setInterval(client.checkLive, 10*1000)



        let version = "1.1.0"
        console.log(`Botten er updateret til version ${version}`)
        client.user.setActivity(`Europa life`, { type: 3 }); // Sætter activity
        client.user.setStatus("online"); // Sætter botten som online
        console.log(chalk.green("[Database]: Forbindelse oprettet!")); // Skriver i console at databasen er online!
        chalk.cyan(`${client.user.username} Er nu online!`); // Skriver i console at vi er online!
    },
};
