module.exports = {
	create: require('./createserver'),
	delete: require('./deleteserver'),
	start: require('./startserver'),
	stop: require('./stopserver'),
	send: require('./sendcommand'),
	versions: require('./versions'),
	help: require('./help'),
	renegerate: require('./regenworld')
}