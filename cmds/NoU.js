module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;
	await message.channel.send("No U.");

}

module.exports.help = {
	name: "your",
	description: 'No U'
	

}