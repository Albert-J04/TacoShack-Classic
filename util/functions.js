const Discord = require('discord.js')
module.exports = {

    check_NaN: function(userID) {
        const shacks = require("../data/shacks.json");
        const fs = require("fs");

        if(isNaN(shacks[userID].balance) || isNaN(shacks[userID].income)) {
            shacks[userID].balance = 100
            shacks[userID].income = 100

            fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
                if(err) console.log(err);
        })
            return false;
        };
        return;
    },

    bet_check: function(bet) {
        if(bet.startsWith("-")) return false;
        if(isNaN(bet)) return false;
        if(bet.includes(".")) return false;
    },

    embed: function(created, original = "09/13/2018") {
        var dt1 = new Date(original); 
        var dt2 = new Date(created);
        const diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        return new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor('Command does not exist yet!', `https://cdn.discordapp.com/attachments/740191201906393130/798674857503752192/TSOlder.png`)
        .setDescription(`📆 That would not be a command for another **${diffDays}** days!`)
        .setFooter(`(${original} → ${created})`)
    },
}
