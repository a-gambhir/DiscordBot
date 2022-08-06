module.exports = {
    commands: ['ban'],
    expectedArgs: '@user',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    permissions: ['BAN_MEMBERS'],

    //description:'Tag a member and ban them',
    //guildOnly: true,


    callback: async (message, arguments, text) => {


            if(!message.mentions.users.size){
                return message.reply('you need to tag a user in order to ban them.');
            }
    
            let taggedUser = message.mentions.members.first();
            let guildName = message.guild.name;
        
            message.channel.send(`Tagged user has been banned.`);
    
            await taggedUser.send(`You have been banned from ${guildName}.`);
            await taggedUser.ban();

        
    },

};