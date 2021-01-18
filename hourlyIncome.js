const settings = require('./util/settings.json')
const shacks = require("./schemas/shacks.js");
const Discord = require('discord.js');
module.exports = {
    send: (bot) => {
        out = []
        var d = new Date().toLocaleTimeString();
        bot.logWebhook.send(`⏱ [\`${d}\`] Hourly Income Starting!`);
        shacks.find()
        .then(async (results) => {
            results.forEach((result, i = 0) => {
                shacks.findOne({userID: result.userID}, async (err, data) => {
                    if (err) {
                        console.log(err)
                        return bot.logWebhook.send(`⚠ An error occured, check logs!`);
                    }
                    if (!data) {
                        return bot.logWebhook.send(`⚠ Lack of data!`);
                    }
                    const oldBalance = data.balance
                    const oldTacos = data.tacos
                    var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
                    var tacos = Math.floor((Math.round(data.income / 4)) + tacorando);
                    data.balance = data.balance + data.income;
                    data.tacos = data.tacos + tacos;
                    data.save().catch(err => console.log(err))
                    out.push(`**${data.name}** (\`${data.userID}\`)\n**Before:** Bal: \`${oldBalance}\` | Tacos: \`${oldTacos}\`\n**+After:** Bal: \`${data.balance}\` | Tacos: \`${data.tacos}\`\nHourly: \`${data.income}\``);
                    i++;
                    if (i === results.length){
                        var string = out.join('\n━━━━━━━━━━━━━━\n')
                        var parts = string.split(/(.{2048})/).filter(O=>O)
                        embeds = []
                        parts.forEach(async part => {
                            const embed = new Discord.MessageEmbed()
                                .setDescription(part)
                                .setColor(`BLURPLE`)
                            embeds.push(embed)
                        })
                        const split = chunkArray(embeds, 10)
                        split.forEach(chunk => {
                            bot.logWebhook.send({embeds: chunk})
                        })
                        var d = new Date().toLocaleTimeString();
                        return bot.logWebhook.send(`✅ [\`${d}\`] Hourly Income Done!`);
                    }
                })
            })
        });
    }
}


function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}