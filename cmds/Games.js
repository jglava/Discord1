const botSettings = require("./../botsettings.json");
const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	let games = message.guild.roles.filter(role => role.name.startsWith("$"));
	if(games.size < 1) return message.channel.send("No games in the server yet.");

		else{
	 message.channel.send(games.array().join("\n"));
	let embed = new Discord.RichEmbed()
     		.setAuthor('Usage:')
     		.setDescription(`${botSettings.prefix}game <name of the game without @ or $!>`)
     		.setColor("#b56959");

     	message.channel.send(embed);
	}

}

module.exports.help = {
	name: "games",
	description: 'shows the list of games'


}