const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your taco shack!`)

    var time = ms(Date.now() - shacks[message.author.id].joined, {long: true});

    var myshack = new Discord.MessageEmbed()
    .setTitle(`${shacks[message.author.id].name}`)
    .setColor('0xf9a422')
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .addField(`Name`, `🔺 ${shacks[message.author.id].name}`)
    .addField(`Balance`, `💵 $${shacks[message.author.id].balance}`)
    .addField(`Income`, `💸 $${shacks[message.author.id].income}/hour`)
    .addField(`Total Tacos`, `🌮 ${shacks[message.author.id].tacos}`)
    .addField(`Shack Age`, `⏳ ${time}`)

    return message.channel.send({embed:myshack})

}

module.exports.help = {
    name: "myshack",
    aliases: ["shack", "profile", "account", "balance", "bal", "b"]
}