const Discord = module.require("discord.js");
const urban = module.require("urban");


module.exports.run = async (client, message, args) => {
	urban.random().first(json => {
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
	name: "random_urban",
	description: 'sends random urban dictionary post in the chat'

}