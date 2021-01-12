const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
   
    shacks.find()
    .then(async (results) => {
        var sortable = []
        results.forEach(async result => {
            sortable.push({
                'name':result.name, 'level':result.balance
        })
    })

    sortable.sort(function(a, b){return b.level - a.level});

    var top10 = sortable.slice(0, 10); 
    var stringarray = [];
    var i = 0;
    await top10.forEach(c => {
        i++;
        stringarray.push(`**${i}.** **${c.name}** - $${c.level.toString()}`);
    });
    
    var string = stringarray.join("\n\n");
            
    var leader = new Discord.MessageEmbed()
    .setColor('#f400f0')
    .setAuthor("💸  Richest Taco Shacks  💸")
    .setDescription(`\n${string}`)

    message.channel.send({embed: leader});
    })


}

module.exports.help = {
    name: "richest",
    aliases: []
}