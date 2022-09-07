const Users = require("../../schemas/users");
const mongoose = require("mongoose");
const config = require("../../config.json");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        const discordid = member.id;
        const discordname = member.user.tag;
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
    },
};
