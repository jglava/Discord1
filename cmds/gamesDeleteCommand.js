module.exports.run = async (client, message, args) => {
	let games = message.guild.roles.filter(role => role.name.startsWith("$"));
	if(games.size < 1) return message.channel.send("No games in the server yet.");

	try {
		await message.member.removeRoles(games);
		message.channel.send('Your game roles have been deleted!');
	} catch(e) {
		message.channel.send(`Operation failed. ${e.message}`);
	}
}

module.exports.help = {
	name: "g_delete",
	description: 'deletes all roles for games'

}