module.exports.run = async (client, message, args) => {
	let games = message.guild.roles.filter(role => role.name.startsWith("$"));
	if(games.size < 1) return message.channel.send("No games in the server yet.");

	let str = args.join(" ");
	let role = games.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

	if(!role) return message.channel.send("This game doesn't exist!");

	try {
		await message.member.addRole(role);
		message.channel.send(`You now have the game role ${role}!`);
	} catch(e) {
		message.channel.send(`Operation failed. ${e.message}`);
	}
}

module.exports.help = {
	name: "game",
	description: 'applies the wanted game role.'

}