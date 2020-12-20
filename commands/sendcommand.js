const { Message } = require('discord.js')

/**
 * Sends a command to the server.
 * @param {Message} message 
 * @param {String[]} args 
 */
function sendCommand(message, args, activeProcesses) {
	if (activeProcesses[message.channel.name]) {
		const child = activeProcesses[message.channel.name]
		child.sendCommand(args.join(" ")+"\n")
	} else {
		message.reply("Server is not running!")
	}
}

module.exports = {
	name: 'sendcommand',
	description: 'Sends a command to the server.',
	syntax: 'sendcommand <command> <arguments>',
	execute: sendCommand
}