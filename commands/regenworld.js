const fs = require('fs-extra')
const locations = require('../locations')

function deleteWorld(message) {
	fs.removeSync(locations.servers+message.channel.name+'/world')
	message.channel.send('Removed world.')
}

function regenerate(message, args, activeProcesses) {
	if (args[0] == "confirm") {
		if (activeProcesses[message.channel.name]) {
			const child = activeProcesses[message.channel.name]
			child.on('close', err => {
				deleteWorld(message)
			})
			child.sendCommand('stop')
		} else {
			deleteWorld(message)
		}
	} else {
		message.reply("Warning, this is irreversible! Type '!regenerate confirm' to remove the minecraft world and generate a new one!")
	}
}

module.exports = {
	name: 'regenerate',
	description: 'Forces the world to regenerate.',
	syntax: 'regenerate',
	execute: regenerate
}