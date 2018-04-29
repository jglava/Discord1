module.exports.run = async (client, message, args) => {
	let msg = await message.channel.send("Loading profile picture...");
	let target = message.mentions.users.first() || message.author;

	if(!message.author.displayAvatarURL) return msg.edit("The user has no profile picture.");

	await message.channel.send({files: [
			{
				attachment: target.displayAvatarURL,
				name:"pfp.png"
			}
		]});

		msg.delete();

	}

module.exports.help = {

	name: "pfp",
	description: "sends (mentioned) user's profile picture" 

}