module.exports = {
    name: 'ban',
    description:'Tag a member and ban them',
    guildOnly: true,

    async execute(message){
        if(!message.mentions.users.size){
            return message.reply('you need to tag a user in order to ban them.');
        }

        let taggedUser = message.guild.member(message.mentions.members.first());
    
        message.channel.send(`Tagged user has been banned.`);

        await taggedUser.sendMessage(`You have been banned from ${message.guild.name}.`);
        await taggedUser.ban();

        
    },

};