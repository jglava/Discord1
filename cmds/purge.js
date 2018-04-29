const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
if (isNaN(args[0])) return message.channel.send('Please enter a number of messages to purge (from 2 to 100)');
if (args[0] > 100) return message.channel.send('Number must be less than 100!');

message.channel.bulkDelete(args[0])
.catch(error => message.channel.send(`error! ${error.message}`));
}


module.exports.help = {
  name: 'purge',
  description: 'clears the chat'
}