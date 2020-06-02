const Discord = require('discord.js'); 

module.exports = { //module.exports allows this command to be used in other files with require()
    name: 'listcommands',
    cooldown: 5,
    description: 'list of all commands for this server, will display list of custom commands later',
    //guildOnly: true,

    execute(message, args) {

        const data = [];
        const{commands} = message.client;


        message.channel.send({embed: {
            color: 3447003,
            title:"Command list for " + message.guild.name,            
            description: commands.map(command =>"!" + command.name).join('\n'),

          }});

    },
};