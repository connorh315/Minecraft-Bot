require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

const fs = require('fs-extra')
const tcpPortUsed = require('tcp-port-used')
const { exec } = require('child_process')
const https = require('https')
const activeProcesses = {}

client.commands = new Discord.Collection();
const clientCommands = require('./commands');
Object.keys(clientCommands).map(key => {
	client.commands.set(clientCommands[key].name, clientCommands[key]);
});

client.on('message', message => {
	const args = message.content.split(/ +/);
	if (!message.content.startsWith("!")) return;
	const command = args.shift().toLowerCase().substring(1);
	console.info(`Called command: ${command}`);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, activeProcesses);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

// client.on("message", (message) => {
// 	var { guild, content } = message
// 	if (!guild || !content.startsWith("!")) return

// 	content = content.substring(1)
// 	const args = content.split(/ +/);
// 	const command = args.shift().toLowerCase();

// 	if (command == "create") {

// 	} else if (command == "delete") {
// 		if (args[0] == "confirm") {
// 			message.reply("Purging...")
// 			const location = "active-servers/"+message.channel.name
// 			message.channel.delete()
// 			if (fs.existsSync(location)) {
// 				fs.removeSync(location)
// 			}
// 		} else {
// 			message.reply("Warning, this is irreversible! Type '!delete confirm' to completely delete this chat, and the minecraft server associated with it!")
// 		}
// 	} else if (command == "start") {
// 		
// 	} else if (command == "stop") {
// 		if (activeProcesses[message.channel.name]) {
// 			const child = activeProcesses[message.channel.name]
// 			child.stdin.setEncoding('utf-8')
// 			child.stdin.write('stop\n')
// 		}
// 	} else if (command == "help") {
// 		message.reply("\nCreate a server: !create <servername> <serverversion>\nDelete a server: !delete (in the server's channel)\nStart a server: !start (in the server channel)\nStop a server: !stop (in the server channel)\n")
// 	} else if (command == "versions") {
// 		message.channel.send("Valid versions:\nAny vanilla version up to latest.\n(Modded versions will be coming after christmas)")
// 	}
// })

client.login(process.env.TOKEN)