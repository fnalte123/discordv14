const Users = require("../../schemas/users");
const mongoose = require("mongoose");
const config = require("../../config.json");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "sql11.freemysqlhosting.net",
    user: "sql11590686",
    password: "aqh72rgReX",
    database: "sql11590686"
    });

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        const discordid = member.id;
        const discordname = member.user.tag;
        const profilepicture = member.user.displayAvatarURL();
        const newProfilePicture = profilepicture.replace(/\.(webp|jpg|jpeg)$/i, ".png");
        let User = await Users.findOne({discordid: discordid, guildId: member.guild.id})
        if (!User) {
            userProfile = await new Users({
                _id:  mongoose.Types.ObjectId(),
                guildId: member.guild.id,
                discordid: discordid, 
                discordname: discordname,
            })
            await userProfile.save().catch(err => console.log(err));
            let channel = client.channels.cache.get(config.welcomechannel);
            channel.send("*Velkommen til serveren brormand, <@" + member + ">!*");
        } else {
            let channel = client.channels.cache.get(config.welcomechannel);
            channel.send("*Velkommen tilbage til serveren brormand, <@" + member + ">!*");
        }
        const sql = "INSERT INTO discord (discordid, discordname, profilepicture) VALUES (?,?,?)";
        const values = [discordid,discordname, newProfilePicture];
        connection.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log("Data inserted into the users table.");
        });
    },
};
