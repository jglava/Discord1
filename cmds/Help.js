const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
  let msg = '__**Help Menu**__';

  bot.commands.forEach(c => {
    msg = msg + `\n**${c.help.name}** - ${c.help.description}`;
  });
  msg = msg +`
**For more help, go to psychotherapist **`;

  let embed = new Discord.RichEmbed()
  .setDescription(msg)
  .setColor('#0099cc');
  message.channel.send('Help sent! Check DMs :heart:');
  message.author.send(embed).catch(() => {
    message.channel.send('An error occured');
  });

}


module.exports.help = {
  name: 'help',
  description: 'Shows the help menu'
}