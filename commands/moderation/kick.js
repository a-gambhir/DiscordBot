module.exports = {
    commands: ['kick'],
    expectedArgs: '@user',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    permissions: ['KICK_MEMBERS'],

    callback: async (message) => {
    

            if(!message.mentions.users.size){
                return message.reply('You need to tag a user in order to kick them.');
            }

            let taggedUser = message.mentions.members.first();
            let guildName = message.guild.name;

            message.channel.send(`Tagged user has been kicked.`);

            taggedUser.sendMessage(`You have been kicked from ${guildName}.`);
            taggedUser.kick();

      
    },

};