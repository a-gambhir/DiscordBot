//https://github.com/TannerGabriel/discord-bot



const fs = require('fs');//fs = file system module
const path = require('path');
const Discord = require('discord.js'); 
const{ RichEmbed } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const ytdl = require("ytdl-core");
const ms = require('ms'); // ms package converts time to ms
const { prefix, token, ownerID } = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
	],
});
//client.commands = new Discord.Collection(); 
const cooldowns = new Discord.Collection();






client.on('ready', async () => { //when client is ready, print to console
  console.log('Ready!')

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir)) //readdirsync returns files in given directory

    for(const file of files){

      //lstatsync gets file status, is file or directory
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if(stat.isDirectory()){
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        //if its a file, import the options as json object(expectedargs,requiredroles,etc)
        const option = require(path.join(__dirname, dir, file))

        //console.log(file,option)
        commandBase(client, option)
        
      }

    }

  }

  readCommands('commands')
})




//Deleting message audit log- bot needs VIEW_AUDIT_LOGS permission
client.on("messageDelete", (message) => {

  if (message) {

    if (!message.content && message.attachments) {

      let user = message.author;

      let embed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
        .setDescription(message.member + " deleted in channel " + message.guild.channels.cache.find(channel => channel.name === message.channel.name))
        .addField("Message", `Contained image/attachment`)
        .addField("Time created", new Date(message.createdTimestamp).toString())
        .setFooter("ID: " + message.id)
        .setTimestamp();

      message.guild.channels.cache.find(channel => channel.name === "logs").send(embed);

    } else {

      try {

        let user = message.author;

        let embed = new Discord.MessageEmbed()
          .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
          .setDescription(message.member + " deleted in channel " + message.guild.channels.cache.find(channel => channel.name === message.channel.name))
          .addField("Message", `${message.content}`)
          .addField("Time created", new Date(message.createdTimestamp).toString())
          .setFooter("ID: " + message.id)
          .setTimestamp();

        message.guild.channels.cache.find(channel => channel.name === "logs").send(embed);

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

        let embed = new Discord.MessageEmbed()
          .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL).setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
          .setDescription(oldMessage.member + "edited a message in channel " + oldMessage.guild.channels.cache.find(channel => channel.name === oldMessage.channel.name) + ` [Goto](${newMessage.url})`)
          .addField("Before", `${oldMessage.content}`)
          .addField("After", `${newMessage.content}`)
          .addField("Time created", new Date(oldMessage.createdTimestamp).toString())
          .setFooter("ID: " + newMessage.id)
          .setTimestamp();

        oldMessage.guild.channels.cache.find(channel => channel.name === "logs").send(embed);


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

  var role = messageReaction.message.guild.roles.cache.get('609201823198347266')//scarlet smasher role id in testing server
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


client.login(token);