const { Message } = require("discord.js")

/**
 * Stops a server.
 * @param {Message} message 
 * @param {String[]} args 
 * @param {Object} activeProcesses 
 */
function stopServer(message, args, activeProcesses) {
	if (activeProcesses[message.channel.name]) {
		const child = activeProcesses[message.channel.name]
		child.sendCommand('stop')
	} else {
		message.reply("Server is not running!")
	}
}

module.exports = {
	name: 'stop',
	description: 'Stops a server.',
	syntax: 'stop (to be run inside of the text channel for that server)',
	execute: stopServer
}