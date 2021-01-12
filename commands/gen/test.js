const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    shacks.find()
		.then(async (results) => {
			results.forEach(result => {
				shacks.findOne({userID: result.userID}, async (err, data) => {
                    if (err) return console.log(err)
                    if (!data) return console.log('no')
					var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
					var tacos = Math.floor((Math.round(data.income / 4)) + tacorando);
					data.balance = data.balance + data.income;
                    data.tacos = data.tacos + tacos;
                    data.save().catch(err => console.log(err))
                    console.log(data)
				})
			})
		})
        return bot.channels.cache.get('787401447217954816').send(`Hourly Income Sent!`);

    return message.channel.send("Hiii!")

    
    
}

module.exports.help = {
    name: "test",
    aliases: []
}