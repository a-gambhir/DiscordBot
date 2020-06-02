

const fs = require('fs');//fs = file system module
const Discord = require('discord.js'); 
const ms = require('ms'); // ms package converts time to ms
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection(); 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js')); //returns array of all JS filenames in "commands"folder

for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => { //when client is ready, print to console
  console.log('Ready!');
});

client.on('message', message => {

 

  if(!message.content.startsWith(prefix) || message.author.bot) return;//if message doesnt start w prefix,ignore it

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

   if(!command) return; 

  if(command.guildOnly && message.channel.type != 'text'){
    return message.reply('I can\'t execute that command inside DMs.');
  }

  if (command.args && !args.length){
   let reply = `You didn't provide any arguments, ${message.author}!`;
  

  if(command.usage){
    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
  }

  return message.channel.send(reply);
}


  if(!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now(); //current timestamp
  const timestamps = cooldowns.get(command.name);//command to look for cooldown of
  const cooldownAmount = (command.cooldown || 3) * 1000; //default cooldown time 3 sec- but must convert to mili

  if(timestamps.has(message.author.id)){  //check if timestamps collection has authorID in it yet
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
 
  if(now < expirationTime) {
    const timeLeft =(expirationTIme = now) / 1000;
    return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    } 
  }
  
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  


  try {
    command.execute(message, args);
  } catch(error){
    console.error(error);

    message.reply('there was an error trying to execute that command!');
  }

  
});



client.login(token);//login to discord w/token