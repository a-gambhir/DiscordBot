module.exports = {
    commands:['server', 'serverinfo', 'server-info'],
    minArgs:0,
    maxArgs:0,
    
    //description:'server name and number of members',

    callback: (message, args) => {
        
    message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}
    \nGuild id: ${message.guild.id}\n Current channel id: ${message.channel.id}`);
    
        
    },

};