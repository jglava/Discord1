module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;
	if(target.id === message.author.id) return message.channel.send("You cannot gas yourself. -w-");
	await message.channel.send(` ${message.mentions.users.first()} is now being gassed by ${message.author}`);

}

module.exports.help = {
	name: "gas",
	description: 'Fun gassing someone mesasge'
	
}