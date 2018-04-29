const randomPuppy = require('random-puppy');

module.exports.run = async (client, message, args) => {
	let msg = await message.channel.send("Generating...");
		await randomPuppy().then(url => message.channel.send(url));

		msg.delete();
}

module.exports.help = {
	name: "doggo",
	description: 'sends dog pics in the chat'
}