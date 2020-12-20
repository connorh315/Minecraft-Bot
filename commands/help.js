const { Message, Client, MessageAttachment } = require('discord.js')

/**
 * Displays help.
 * @param {Message} message
 * @param {String[]} args
 * @param {Object} activeProcesses
 * @param {Client} client
 */
function help(message, args, activeProcesses) {
	var response = "Available commands:\n"
	message.client.commands.forEach(command => {
		response += "!" + command.name + ":\n  - " + command.description + "\n  - !" + command.syntax + "\n"
	})
	message.channel.send(response)

}

module.exports = {
	name: 'help',
	description: 'Displays all commands.',
	syntax: 'help',
	execute: help
}