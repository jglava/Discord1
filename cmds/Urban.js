const Discord = module.require("discord.js");
const urban = module.require("urban");


module.exports.run = async (client, message, args) => {
	if(args.lenght < 1) return message.channel.send("Please enter a word to search for.");
	let str = args.join(" ");

	urban(str).first(json => {
		if(!json) return message.channel.send("Nothing found, sorry.");

		let embed = new Discord.RichEmbed()
			.setTitle(json.word)
			.setDescription(json.definition || "None")
			.setColor("#59a5b5")
			.addField("Upvotes", json.thumbs_up, true || "None")
			.addField("Downvotes", json.thumbs_down, true || "None")
			.setFooter(`Written by ${json.author}` || "None");

		message.channel.send(embed);
	});


}

module.exports.help = {
	name: "urban",
	description: 'sends wanted/mentioned urban dictionary post in the chat'

}