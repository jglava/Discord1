const talkedRecently = new Set();
const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const Music = require('discord.js-musicbot-addon');

 
const prefix = botSettings.prefix;

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

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


 const music = new Music(client, {
  youtubeKey: "AIzaSyDhuOq3M-MI-5VDS75E0UBsUZ1qzv2kezc",
  prefix: "$",
  global: true,           
  maxQueueSize: 25,        
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
	client.user.setActivity('$help');

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

     if (talkedRecently.has(message.author.id))
  	return;

  	talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 5000);

  if (message.content.startsWith(botSettings.prefix + "eval")) {
    if(message.author.id !== botSettings.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

});

client.login(process.env.BOT_TOKEN);
