const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;
	let embed = new Discord.RichEmbed()
     		.setAuthor(target.username)
     		.setDescription("User description/info!")
     		.setColor("#9B59B5")
     		.addField("Full name", `${target.username}#${target.discriminator}`)
     		.addField("ID", target.id)
     		.addField("Created at", target.createdAt);

     	message.channel.sendEmbed(embed);
	}

module.exports.help = {
	name: "userinfo",
	description: "shows user's info."

}