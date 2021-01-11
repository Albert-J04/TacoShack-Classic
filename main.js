const Discord = require('discord.js')
const bot = new Discord.Client();
const settings = require('./util/settings.json');
const shacks = require('./data/shacks.json');
const requireAll = require('require-all');
const path = require('path');
const fs = require('fs');
const funcs = require('./util/functions.js')

//ready
bot.on('ready', () => {
    console.log("Taco Shack Ready to Sell Some Tacos!")
    bot.user.setActivity(`with v1.0`)

    // HOURLY INCOME
    setInterval (function () {
        for(var key in shacks) {
            var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
            var tacos = Math.floor((Math.round(shacks[key].income / 4)) + tacorando);
            shacks[key].balance = shacks[key].balance + shacks[key].income;
            shacks[key].tacos = shacks[key].tacos + tacos;
            fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
                if(err) console.log(err);
            })
        }
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