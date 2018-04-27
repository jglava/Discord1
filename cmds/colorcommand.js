module.exports.run = async (client, message, args) => {
	let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
	if(colors.size < 1) return message.channel.send("No colors in the server yet.");

	let str = args.join(" ");
	let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

	if(!role) return message.channel.send("This color doesn't exist!");

	try {
		await message.member.removeRoles(colors);
		await message.member.addRole(role);
		message.channel.send(`You now have the color ${role}!`);
	} catch(e) {
		message.channel.send(`Operation failed. ${e.message}`);
	}
}

module.exports.help = {
	name: "color",
	description: 'applies the wanted color.'

}