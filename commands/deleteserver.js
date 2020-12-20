const { Message } = require('discord.js')
const fs = require('fs-extra')

function deleteFiles(serverToDelete) {
	const location = "active-servers/"+serverToDelete
	if (fs.existsSync(location)) {
		fs.removeSync(location)
	}
}

/**
 * Deletes a server.
 * @param {Message} message 
 * @param {String[]} args 
 * @param {Object} activeProcesses 
 */
function deleteServer(message, args, activeProcesses) {
	if (message.channel.parent.name == "Minecraft") {
		if (args[0] == "confirm") {
			const server = message.channel.name
			const child = activeProcesses[server]
			if (child) {
				child.on('close', code => {
					deleteFiles(server)
				})
			} else {
				deleteFiles(server)
			}
			
			message.channel.delete()
		} else {
			message.reply("Warning, this is irreversible! Type '!delete confirm' to completely delete this chat, and the minecraft server associated with it!")
		}
	} else {
		message.reply("Nice try, but you cannot delete this channel.")
	}
}

module.exports = {
	name: 'delete',
	description: 'Deletes a server.',
	syntax: 'delete (to be run inside of the text channel for that server)',
	execute: deleteServer
}