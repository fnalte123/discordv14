const config = require("../../config.json");
const axios = require("axios");
const qs = require("qs");
const mongoose = require("mongoose");
const { EmbedBuilder } = require("discord.js");
const Streamers = require("../../schemas/streamers");
const dbchannels = require("../../schemas/channels");

module.exports = (client) => {
  
  
  
  String.prototype.deleteWord = function (searchTerm) {
    var str = this;
    var n = str.search(searchTerm);
    while (str.search(searchTerm) > -1) {
      n = str.search(searchTerm);
      str =
        str.substring(0, n) + str.substring(n + searchTerm.length, str.length);
    }
    return str;
  };

  client.checkLive = async () => {
    const streamliste = await Streamers.find({});
    const access_token = config.access_token;
    const clientid = config.twitchclientid;
    const client_secret = config.twitchSecret;
    
    
    let twitchChannel = await dbchannels.findOne({ guildId: config.guildid });

    if(!twitchChannel) {
      console.log("No twitch channel found!")
    } else {
      twitchChannel = client.channels.cache.get(twitchChannel.twitchchannel)
      let list = "";

      if (streamliste.length === 0) return;
      streamliste.map((streamer, index) => {
        if (index === 0) list = list + streamer.streamername;
        else list = list + "&user_login=" + streamer.streamername;
      });

      let data = qs.stringify({
        client_id: clientid,
        client_secret: client_secret,
        grant_type: "client_credentials",
      });
      let getStreamerData = {
        method: "get",
        url: `https://api.twitch.tv/helix/streams?user_login=${list}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Client-Id": clientid,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(getStreamerData).then(async function (response) {
        const data = response.data.data;
        streamliste.forEach(async (element) => {
          if (element.IsLive === false) {
            data.forEach(async (stream) => {
              if (stream.type === "live") {
                if (
                  element.streamername == stream.user_name ||
                  element.streamername == stream.user_login
                ) {
                  let getURLData = {
                    method: "get",
                    url: `https://api.twitch.tv/helix/users?login=${stream.user_name}`,
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                      "Client-Id": clientid,
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: data,
                  };

                  axios(getURLData).then(async function (iconData) {
                    const URLdata = iconData.data.data[0];
                    let profilbillede = URLdata.profile_image_url;
                    const twitchLink = `https://twitch.tv/${stream.user_name}`;
                    const embed = new EmbedBuilder()
                      .setTitle(stream.title)
                      .setURL(twitchLink)
                      .setImage(
                        stream.thumbnail_url.deleteWord("-{width}x{height}")
                      )
                      .setColor('#6441a5')
                      .setAuthor({
                        name: element.streamername,
                        iconURL: profilbillede,
                      })
                      .setThumbnail(profilbillede)
                      .addFields([
                        {
                          name: `👤 Seere`,
                          value: `${stream.viewer_count}`,
                          inline: true,
                        },
                        {
                          name: "🎮 Spil",
                          value: `${stream.game_name}`,
                          inline: true,
                        },
                      ]);
                    await twitchChannel.send({
                      content: `**${stream.user_name}** er nu gået live på twitch! Hop ind og støt kanalen! @here`,
                      embeds: [embed],
                    });
                    await Streamers.updateOne(
                      {
                        streamername: element.streamername,
                      },
                      { IsLive: true }
                    );
                  });
                }
              } else
                await Streamers.updateOne(
                  {
                    streamername: element.streamername,
                  },
                  { IsLive: false }
                );
            });
          } else {
          }
        });
      });
    }
  };
};
