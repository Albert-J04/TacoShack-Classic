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
        
        // Send Messages Permission
		if (!message.channel.permissionsFor(message.guild.me.id).has('SEND_MESSAGES')) {
			message.author.send(`I don't have SEND_MESSAGES permission in *${member.guild.name}* server. Please report this to the server moderators.`).catch(() => {});
			return;
        }
		
		if(command.permissions && !command.permissions.every(permission=>message.member.permissions.has(permission))){
			message.channel.send('❗ | You do not have the required permissions to use this command!')
			 return;
		}

        // Check if command require args
		if (command.args && !args.length) {
			const data = [];
			data.push(`❗ | You didn't provide any arguments!`);
			if (command.usage) data.push(`To use this command use: \`${botSettings.prefix}${command.name} ${command.usage}\``);
			message.channel.send(data)
			return;
			
        }
        
        // Developer commands
		if (command.dev) {
			if (message.author.id != botSettings.ownerID) return message.channel.send('❗ | Only the Bot Owner can run this command!')
        }
        
        let data;
		try {
			command.run(bot, message, args, funcs);
		}
		catch(err) {
			console.log(err);
			message.reply('There was an error trying to execute that command!');
        }
};
