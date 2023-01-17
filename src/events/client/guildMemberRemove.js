const config = require("../../config.json");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "sql11.freemysqlhosting.net",
    user: "sql11590686",
    password: "aqh72rgReX",
    database: "sql11590686"
    });


module.exports = {
    name: "guildMemberRemove",
    async execute(member, client) {

        const discordid = member.id;
        const sql1 = `DELETE FROM users WHERE discordid = ${discordid}`;
        const values1 = [discordid];
        connection.query(sql1, values1, function(err, result) {
        if (err) throw err;
        });

        const sql = `DELETE FROM discord WHERE discordid = ${discordid}`;
        const values = [discordid];
        connection.query(sql, values, function(err, result) {
        if (err) throw err;
        });
    },
};

