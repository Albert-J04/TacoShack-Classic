const Discord = require('discord.js')
const mongoose = require('./mongoose.js')
const bot = new Discord.Client();
const settings = require('./util/settings.json');
const shacks = require("./schemas/shacks.js");
const requireAll = require('require-all');
const path = require('path');
const fs = require('fs');

//ready
bot.on('ready', () => {
    console.log("Taco Shack Ready to Sell Some Tacos!")
    bot.user.setActivity(`with v1.0`)

    // HOURLY INCOME
    setInterval (function () {
		shacks.find()
		.then(async (results) => {
			results.forEach(result => {
				shacks.findOne({userID: results.userID}, async (err, data) => {
					if (err || !data) return console.log('weird')
					var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
					var tacos = Math.floor((Math.round(shacks[key].income / 4)) + tacorando);
					data.balance = data.balance + data.income;
					data.tacos = data.tacos + tacos;
				})
			})
		})
        return bot.channels.cache.get('787401447217954816').send(`Hourly Income Sent!`);

    }, 3600000);//3600000

});

bot.on("error", (e) => console.error("Error " + e));
bot.on("warn", (e) => console.warn("Warn " + e));

const events = requireAll({
	dirname: __dirname + '/events',
	filter: /^(?!-)(.+)\.js$/,
});
// Bind the client events to the files
for (const name in events) {
	const event = events[name];
	bot.on(name, event.bind(null, bot));
}

bot.commands = new Discord.Collection();
function getCommands(dir, callback) {
	fs.readdir(dir, (err, files) => {
		if (err) throw err;
		files.forEach((file) => {
			const filepath = path.join(dir, file);
			fs.stat(filepath, (err, stats) => {
				if (stats.isDirectory()) {
					getCommands(filepath, callback);
				}
				else if (stats.isFile() && file.endsWith('.js')) {
					const command = require(`./${filepath}`);
					bot.commands.set(command.help.name, command);
					console.log(command.help.name)
				}
			});
		});
	});
}
getCommands('./commands/');


bot.login(settings.token);
mongoose.init()