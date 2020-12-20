const { Message } = require('discord.js')

/**
 * Sends the user the available minecraft versions.
 * @param {Message} message 
 */
function sendVersions(message) {
	message.channel.send("All vanilla versions up to latest. (modded versions coming after christmas)")
}

module.exports = {
	name: 'versions',
	description: 'Displays all available server versions.',
	syntax: 'versions',
	execute: sendVersions
}