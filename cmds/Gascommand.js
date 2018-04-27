module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;
	await message.channel.send(` ${message.mentions.users.first() || message.author} is now being gassed by ${message.author}`);

}

module.exports.help = {
	name: "gas" || "Gas",
	description: 'Fun gassing someone mesasge'
	

}