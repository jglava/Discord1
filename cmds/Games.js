const botSettings = require("./../botsettings.json");
const Discord = module.require("discord.js");
const prefix = botSettings.prefix;

module.exports.run = async (client, message, args) => {
	let games = message.guild.roles.filter(role => role.name.startsWith("$"));
	let description = (games.array().join("\n"));
	if(games.size < 1) return message.channel.send("No games in the server yet.");

		else{

	 let embed = new Discord.RichEmbed()
	      	.setAuthor('List of games:\n')
     		.setDescription(description)
     		.setFooter(`Usage: ${botSettings.prefix}game <name of the game without @ or $!>`)
     		.setColor("#b56959");

     	message.channel.send(embed);
	}

}

module.exports.help = {
	name: "games",
	description: 'shows the list of games'


}
