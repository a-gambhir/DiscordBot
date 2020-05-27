module.exports = {
    name:'server',
    description:'server name and members',

    execute(message, args) {
        
    message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    
        
    },

};