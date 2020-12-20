// TODO: Find some way to remove this crap without removing intellisense
const { Message } = require("discord.js")
const locations = require('../locations.js')
const fs = require('fs-extra')

function copyDeployable(deployableLoc, serverLoc) {
	fs.mkdirSync(serverLoc)
	fs.copySync(deployableLoc, serverLoc)
	fs.copySync("eula.txt", serverLoc+"/eula.txt")
}

function downloadServerJar(message, request, deployableLoc, serverLoc) {
	const version = args[1].split("-")[1]
	message.channel.send("Downloading server.jar")
	https.get(`https://papermc.io/api/v1/paper/${version}/latest/download`, response => {
		if (response.statusCode == 200) {
			fs.mkdirSync(deployableLoc)

			const file = fs.createWriteStream(deployableLoc+'/server.jar')
			response.pipe(file)
			file.on('finish', () => {
				file.close()
				copyDeployable(deployableLoc, serverLoc)
				message.reply("Server creation successful!")
			})
		} else if (response.statusCode == 404) {
			message.reply('Invalid server version (use !versions to find a valid list)')
		}
	}).on('error', err => {
		fs.unlink(deployableLoc+'/server.jar')
		message.channel.send('An error occurred, ', err)
	})
}

/**
 * Creates a Minecraft server.
 * @param {Message} message
 * @param {String[]} args 
 */
function createServer(message, args) {
	const guild = message.guild
	const deployableLoc = locations.deployables+args[1]
	const serverLoc = locations.servers+args[0]
	var deployableExists = false
	if (!args[0]) {
		message.reply("Missing name for server!")
		return
	} else if (!args[1]) {
		message.reply("Missing server version (!versions)")
		return
	} else if (!fs.existsSync(deployableLoc)) {
		if (args[1].startsWith('vanilla')) {
			
		} else {
			message.reply("Invalid server version (use !versions to find a valid list)")
		}
		return
	} else if (fs.existsSync(serverLoc)) {
		message.reply("Server already exists...")
		return
	} else {
		deployableExists = true
	}

	message.reply("Creating server... please standby!")

	if (!guild.channels.cache.find(c => c.name == "Minecraft" && c.type == "category")) {
		guild.channels.create('Minecraft', {
			type: 'category',
		}).then(console.log).catch(console.error)
	}

	guild.channels.create(args[0], "text").then(channel => {
		let category = guild.channels.cache.find(c => c.name == "Minecraft" && c.type == "category")

		if (!category) throw new Error("Category channel does not exist")
		channel.setParent(category.id)
	}).catch(console.error)
	if (deployableExists) {
		fs.mkdirSync(serverLoc)
		fs.copySync(deployableLoc, serverLoc)
		fs.copySync("eula.txt", serverLoc+"/eula.txt")
		message.reply("Server creation successful!")
	}
}

module.exports = {
	name: 'create',
	description: 'Creates a server.',
	syntax: 'create <server-name> <server-version>',
	execute: createServer
}