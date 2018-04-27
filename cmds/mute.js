module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to mute this person")
	
	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if (!toMute) return message.channel.send("You didn't specify a user or ID!");

	if(toMute.id === message.author.id) return message.channel.send("You cannot mute yourself. -w-");
	if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a member who has a higher role than you do!");

	let role = message.guild.roles.find(r => r.name === "Bot Muted");
	if(!role) {
		try {
			role = await message.guild.createRole({
					name: "Bot Muted",
					color: "#000000",
					permission: []
			});

			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch(e) {
			console.log(e.stack);
		}
    }
		if(toMute.roles.has(role.id)) return message.channel.send(" That user is already muted!");

		await toMute.addRole(role);
		message.channel.send("I've muted them.");

	}

module.exports.help = {
	name: "mute",
	description: 'Mutes a wanted someone.'

}