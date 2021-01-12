const settings = require('./util/settings.json')
const shacks = require("./schemas/shacks.js");
module.exports = {
    send: (bot) => {
        var d = new Date().toLocaleTimeString();
        bot.logWebhook.send(`⏱ [\`${d}\`] Hourly Income Starting!`);
        shacks.find()
        .then(async (results) => {
            results.forEach((result, i = 0) => {
                i++;
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
                    bot.logWebhook.send(`** **\n**${data.name}** (\`${data.userID}\`)\n**Previous:** Bal: \`${oldBalance}\` | Tacos: \`${oldTacos}\`\n**+After:** Bal: \`${data.balance}\` | Tacos: \`${data.tacos}\``);
                    if (i === results.length){
                        var d = new Date().toLocaleTimeString();
                        return bot.logWebhook.send(`✅ [\`${d}\`] Hourly Income Done!`);
                    }
                })
            })
        });
    }
}
