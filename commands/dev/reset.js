const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require('fs');
const path = require('path');
module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return;

    if (args[0].toLowerCase() != 'name') return;

    const userid = args[1].replace(/[<@!>]/g, '')
    const params = args.splice(2).join(' ')

    if(params.length < 3) return message.reply(`Please use more than \`3\` characters!`);
    if(params.length > 30) return message.reply(`Please use less than \`30\` characters!`);
    if(!isNaN(params)) return message.reply(`Please use letters!`);

    shacks.findOne({userID: userid}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`Shack not found!`)
            return;
        } else if (data){
            data.name = params
            data.save().catch(err => console.log(err))
            return message.channel.send(`✅ Changed (\`${data.userID}\`) name to: **${data.name}**`)
        }
    })
}



module.exports.help = {
    name: "reset",
    aliases: []
}