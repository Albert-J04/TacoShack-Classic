const Discord = require('discord.js');
const settings = require(`../util/settings.json`)
const funcs = require('../util/functions.js')
const cooldown = new Set();
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
		
		if(cooldown.has(message.author.id)) {
			message.channel.send("❌ Please slow down!")
			return
		} else{
			cooldown.add(message.author.id)
			setTimeout(() => {
				cooldown.delete(message.author.id)
			}, 1500);
		}		

		try {
			command.run(bot, message, args, funcs);
		}
		catch(err) {
			console.log(err);
			message.reply('There was an error trying to execute that command!');
        }
};
