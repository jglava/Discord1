module.exports.run = async (client, message, args) => {
	let games = message.guild.roles.filter(role => role.name.startsWith("$"));
	if(games.size < 1) return message.channel.send("No games in the server yet.");

	message.channel.send(games.array().join(" "));
}

module.exports.help = {
	name: "games",
	description: 'shows the list of games'


}