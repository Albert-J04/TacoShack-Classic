const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");
const redis = require('../../redis')
let cdseconds = 300;

module.exports.run = async (bot, message, args) => {

    shacks.findOne({userID: message.author.id}, async (err, data) => {
        if (err){
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
            return
        } else if (data) {

            const redisClient = await redis()
            const redisKey = `tips-${message.author.id}`

            redisClient.get(redisKey, function(err, reply) {
                if (reply) {
                    message.channel.send("Chill... Money doesn't grow on trees!")
                  redisClient.quit()
                  return;
                }
      
                try{
                  redisClient.set(redisKey, 'TRUE', 'EX', cdseconds)
                  var tip = Math.floor(Math.random() * (50 - 10) ) + 10;
                  data.balance += tip
                  data.save().catch(err => console.log(err))
          
                  return message.channel.send(`💵 You collected **$${tip}** in tips!`)
                } finally {
                 redisClient.quit()
                }
              })
            

        }
    })
}

module.exports.help = {
    name: "tips",
    aliases: ["tip"]
}