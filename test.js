const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;





client.login(config.token);

client.once('ready', () => { 
    console.log('Ready!')
  })

/* client.on("message", (message) => {
     if(!message.content.startsWith(config.prefix) || message.author.bot) return;

     if(message.content.startsWith(config.prefix + "ping")){
         message.channel.send("pong!");
     }
 }) */