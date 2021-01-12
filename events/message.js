const Discord = require('discord.js');
const settings = require(`../util/settings.json`)
const funcs = require('../util/functions.js')
module.exports = async (bot, message) => {

        if(!message.guild || !message.content.startsWith(settings.prefix) || message.author.bot) return;
        
        const args = message.content.slice(settings.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
		const command = bot.commands.get(commandName)
			|| bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

        if (!command) return;
        
        // Developer commands
		if (command.help.dev) {
			if (!settings.devs.includes(message.author.id)) return
		}
		
		try {
			command.run(bot, message, args, funcs);
		}
		catch(err) {
			console.log(err);
			message.reply('There was an error trying to execute that command!');
        }
};
