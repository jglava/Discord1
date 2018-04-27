module.exports.run = async (client, message, args) => {
	let msg = await message.channel.send("Loading server icon...");

	if(!message.guild.iconURL) return msg.edit("No icon");

	await message.channel.send({files: [
			{
				attachment: message.guild.iconURL,
				name:"server_icon.png"
			}
		]});

		msg.delete();

	}

module.exports.help = {
	name: "icon",
	description: 'sends server icon in the chat'

}