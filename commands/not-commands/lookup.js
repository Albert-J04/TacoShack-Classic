const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {

    message.channel.send(funcs.embed("04/10/2020"))
    
}

module.exports.help = {
    name: "lookup",
    aliases: ['search']
}