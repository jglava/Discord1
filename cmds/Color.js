const botSettings = require("./../botsettings.json");
const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
	if(colors.size < 1) return message.channel.send("No colors in the server yet.");

	else{
	 message.channel.send(colors.array().join(" "));
	let embed = new Discord.RichEmbed()
     		.setAuthor('Usage:')
     		.setDescription(`${botSettings.prefix}color <name of the color without @ or #!>`)
     		.setColor("#616163");

     	message.channel.send(embed);
	}

}

module.exports.help = {
	name: "colors",
	description: 'shows the list of colors'


}