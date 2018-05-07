module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;
	await message.channel.send("Ez");

}

module.exports.help = {
	name: "jg",
	description: 'good game - gg'
	

}