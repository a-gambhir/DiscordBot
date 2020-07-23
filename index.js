
const fs = require('fs');//fs = file system module
const Discord = require('discord.js'); 
const{ RichEmbed } = require('discord.js');
const ms = require('ms'); // ms package converts time to ms
const { prefix, token, ownerID } = require('./config.json');

//searching directory for commands
function search(dir){
  const commandList = new Discord.Collection();
  files = fs.readdirSync(dir, {'withFileTypes': true});

  for(const file of files){
    const name = file.name;
    if(file.isDirectory()){

      console.log(name);  
      commandList[name] = search(`${dir}/${name}`); //if directory, search again until a file is found
      
  
    }
    else if (name.endsWith('.js')){
      const command = require(`${dir}/${name}`);//require looks at file for module and exports it
      commandList.set(command.name, command);
      console.log(command.name);

    }

  }
  return commandList;
}

const client = new Discord.Client();
client.commands = new Discord.Collection(); 


 client.commands = search('./commands');

/*
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js')); //returns array of all JS filenames in "commands"folder

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  
  client.commands.set(command.name, command);
}
*/

const cooldowns = new Discord.Collection();

client.once('ready', () => { //when client is ready, print to console
  console.log('Ready!');
});

client.on('message', message => {

 
  if(!message.content.startsWith(prefix) || message.author.bot) return;//if message doesnt start w prefix,ignore it

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  console.log(commandName);


  let command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

   if(!command){
     command = client.commands.moderation.get(commandName);
   } 


  if(command.guildOnly && message.channel.type != 'text'){
    return message.reply('I can\'t execute that command inside DMs.');
  }

  if (command.args && !args.length){
   let reply = `You didn't provide any arguments.`;
  

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


//Deleting message audit log- bot needs VIEW_AUDIT_LOGS permission
client.on("messageDelete", (message) => {

  if (message) {

    if (!message.content && message.attachments) {

      let user = message.author;

      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        .setDescription(message.member + " deleted in channel " + message.guild.channels.find(channel => channel.name === message.channel.name))
        .addField("Message", `Contained image/attachment`)
        .addField("Time created", new Date(message.createdTimestamp).toString())
        .setFooter("ID: " + message.id)
        .setTimestamp();

      message.guild.channels.find(channel => channel.name === "logs").send(embed);

    } else {

      try {

        let user = message.author;

        let embed = new Discord.RichEmbed()
          .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
          .setDescription(message.member + " deleted in channel " + message.guild.channels.find(channel => channel.name === message.channel.name))
          .addField("Message", `${message.content}`)
          .addField("Time created", new Date(message.createdTimestamp).toString())
          .setFooter("ID: " + message.id)
          .setTimestamp();

        message.guild.channels.find(channel => channel.name === "logs").send(embed);

      } catch (error) {

        console.error("message deleted");

      }

    }

  }

});

//Editing messages audit log-bot needs VIEW_AUDIT_LOGS permission
client.on("messageUpdate", (oldMessage, newMessage) => {

  if (oldMessage.content) {

    if (oldMessage.content != newMessage.content) {

      try {

        let user = oldMessage.author;

        let embed = new Discord.RichEmbed()
          .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL).setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
          .setDescription(oldMessage.member + "edited a message in channel " + oldMessage.guild.channels.find(channel => channel.name === oldMessage.channel.name) + ` [Goto](${newMessage.url})`)
          .addField("Before", `${oldMessage.content}`)
          .addField("After", `${newMessage.content}`)
          .addField("Time created", new Date(oldMessage.createdTimestamp).toString())
          .setFooter("ID: " + newMessage.id)
          .setTimestamp();

        oldMessage.guild.channels.find(channel => channel.name === "logs").send(embed);


      } catch (error) {

        console.log(error);

      }


    }

  }

});


client.login(token);//login to discord w/token



//Role reactions
client.on('raw', event => { //occurs whenever any event happens
  //console.log(event);
  const eventName = event.t; //t maps to event name(looking for message react)
  if(eventName === 'MESSAGE_REACTION_ADD'){
    
    if(event.d.message_id === '722909320693547051'){ //msg id for role reactions in testing guild
      console.log("Reacted to correct message.");

      var channel = client.channels.get(event.d.channel_id); //gets channel id from json object, can also put in channel id manually
      if(channel.messages.has(event.d.message_id)){
        return;
      }   
      else{
        channel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.user_id);
          client.emit('messageReactionAdd', msgReaction, user);//calls this event
        })
        .catch(err => console.log(err));
      }

    }

  }
  else if(eventName === 'MESSAGE_REACTION_REMOVE'){

    if(event.d.message_id === '722909320693547051'){ //msg id for role reactions in testing guild
      console.log("Reacted to correct message.");

      var channel = client.channels.get(event.d.channel_id); //gets channel id from json object, can also put in channel id manually
      if(channel.messages.has(event.d.message_id)){
        return;
      }   
      else{
        channel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.user_id);
          client.emit('messageReactionRemove', msgReaction, user);//calls this event
        })
        .catch(err => console.log(err));
      }

    }

  }

})

client.on('messageReactionAdd', (messageReaction, user) => { //add for other roless

  var role = messageReaction.message.guild.roles.get('609201823198347266')//scarlet smasher role id in testing server
  var emojiName = messageReaction.emoji.name.toLowerCase();

  if(emojiName === "moai"){
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);

     if(member)
     {
       member.addRole(role);
     } 

  }

}); 

client.on('messageReactionRemove', (messageReaction, user) => {

  var role = messageReaction.message.guild.roles.get('609201823198347266')//scarlet smasher role id in testing server
  var emojiName = messageReaction.emoji.name.toLowerCase();

  if(emojiName === "moai"){
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);

     if(member)
     {
       member.removeRole(role);
     } 

  }

})