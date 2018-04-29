module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to mute this person")
	
	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You didn't spicify a user or ID to unmute!");

	let role = message.guild.roles.find(r => r.name === "Bot_Muted");

	if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");

	await toMute.removeRole(role);
	message.channel.send("I have unmuted them.");
	}

module.exports.help = {
	name: "unmute",
	description: 'unmutes a person'
}
