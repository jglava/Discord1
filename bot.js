const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const anti_spam = require("discord-anti-spam");
const Music = require('discord.js-musicbot-addon');
 
const prefix = botSettings.prefix;

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
          let props = require(`./cmds/${f}`);
          console.log(`${i + 1}: ${f} loaded!`);
          client.commands.set(props.help.name, props);
     });


	anti_spam(client, {
 		warnBuffer: 2, 
 		maxBuffer: 15,
 		interval: 1000,
 		warningMessage: "stop spamming or I'll whack your head off.",
 		banMessage: "has been banned for spamming, anyone else?", 
 	});


 const music = new Music(client, {
  youtubeKey: "AIzaSyDhuOq3M-MI-5VDS75E0UBsUZ1qzv2kezc",
  prefix: "$",
  global: true,           
  maxQueueSize: 100,        
  clearInvoker: true,
  messageHelp: true,
  enableQueueStat: true,     
  helpCmd: 'mhelp',        
  playCmd: 'play',        
  volumeCmd: 'adjust',     
  leaveCmd: 'stop',      
  disableLoop: true  

});



}); 

client.on("ready", async () => {
	console.log(`Bot is ready! ${client.user.username}`);
     console.log(client.commands);

	try {
		let link = await client.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
			console.log(e.stack);
	}
	client.user.setActivity("type help | killing jews");

});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'member-log');
	if (!channel) return;
channel.send(`Welcome to the server, ${member}`);



});

client.on("message", async message => {
     if(message.author.bot) return;
     if(message.channel.type === "dm") return;

     let messageArray = message.content.split(" ");
     let command = messageArray[0];
     let args = messageArray.slice(1);

     if(!command.startsWith(prefix)) return;

     let cmd = client.commands.get(command.slice(prefix.length).toLowerCase());
     if (cmd) cmd.run(client, message, args);

});




client.login(process.env.BOT_TOKEN);
