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
    
            let taggedUser = message.guild.member(message.mentions.members.first());
        
            message.channel.send(`Tagged user has been banned.`);
    
            await taggedUser.sendMessage(`You have been banned from ${message.guild.name}.`);
            await taggedUser.ban();

        
    },

};