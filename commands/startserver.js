const { Message } = require("discord.js")

const tcpPortUsed = require('tcp-port-used')
const { exec } = require('child_process')


/**
 * Starts a minecraft server.
 * @param {Message} message 
 * @param {String[]} args 
 * @param {Object} activeProcesses 
 */
function startServer(message, args, activeProcesses) {
	
	if (!activeProcesses[message.channel.name]) {
		message.reply("Starting server")
		var serverSpawned = false
		for (var i = 25560; i <= 25565; i++) {
			const port = i
			console.log(i)
			if (!serverSpawned) {
				tcpPortUsed.check(port).then(inUse => {
					if (!inUse && !serverSpawned) {
						serverSpawned = true
						const location = `active-servers/${message.channel.name}`
						const string = `java -Xmx2048M -Xms512M -jar server.jar --port ${port} nogui`
						
						child = exec(string, {cwd: location}, (err, stdout, stderr) => {
							if (err) {
								message.channel.send("The server encountered an error.")
							}
						})
						child.sendCommand = function(command) {
							this.stdin.setEncoding('utf-8')
							this.stdin.write(command+"\n")
						}
						child.on('close', code => {
							activeProcesses[message.channel.name] = null
							if (code == 0) {
								message.channel.send('Server has shutdown.')
							} 
						})
						activeProcesses[message.channel.name] = child
						message.channel.send(`Server started at ch315.dynu.net:${port}`)
					}
				})
			}
		}
	} else {
		message.reply("Server already running!")
	}
}

module.exports = {
	name: 'start',
	description: 'Starts a server.',
	syntax: 'start (to be run inside of the text channel for that server)',
	execute: startServer
}