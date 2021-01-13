const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

       shacks.find().sort([
        ['income', 'descending']
    ]).exec(async (err, res) => {

        if(err) return console.log(err);

        var leader = new Discord.MessageEmbed()
        .setColor('#f400f0')
        .setAuthor("💸  Highest Hourly Incomes  💸")

        stringarray = []
        if (res.length === 0 ) {
            // ... 
        } else if (res.length < 10) { // Less than 10 results
            for(i = 0; i < res.length; i++) { 
                stringarray.push(`**${i + 1}.** **${res[i].name}** - $${res[i].income.toString()}/hour`)
            }
        } else {
            for(i = 0; i < 10; i++) { 
                stringarray.push(`**${i + 1}.** **${res[i].name}** - $${res[i].income.toString()}/hour`)
            }
        }
        var string = stringarray.join("\n\n");
        leader.setDescription(`\n${string}`)
        await message.channel.send(`This command was not part of v1.0!`, {embed: leader});
    })

}

module.exports.help = {
    name: "income",
    aliases: ['incomes']
}