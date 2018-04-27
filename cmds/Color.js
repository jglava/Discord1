module.exports.run = async (client, message, args) => {
	let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
	if(colors.size < 1) return message.channel.send("No colors in the server yet.");

	message.channel.send(colors.array().join(" "));
}

module.exports.help = {
	name: "colors",
	description: 'shows the list of colors'


}