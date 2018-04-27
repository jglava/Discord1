const snek = module.require("snekfetch");
const api = "https://aws.random.cat/meow";

module.exports.run = async (client, message, args) => {
	let msg = await message.channel.send("Generating...");

	let file = (await snek.get(api)).body.file;
	if(!file) return message.channel.send("Whoops! Something is wrong, try again!");

	await message.channel.send({files: [
			{
				attachment: file,
				name: file.split("/").pop()
			}
		]});

		msg.delete();
}

module.exports.help = {
	name: "cat",
	description: 'sends cat pics in the chat'
}
