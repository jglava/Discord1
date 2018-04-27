const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

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
	client.user.setGame("little jews die. (help = help)", 'https://www.twitch.tv/jglava_mc/');
});

client.on("message", async message => {
     if(message.author.bot) return;
     if(message.channel.type === "dm") return;

     let messageArray = message.content.split(" ");
     let command = messageArray[0];
     let args = messageArray.slice(1);

     if(!command.startsWith(prefix)) return;

     let cmd = client.commands.get(command.slice(prefix.length));
     if (cmd) cmd.run(client, message, args);

});



client.login(process.env.BOT_TOKEN);
