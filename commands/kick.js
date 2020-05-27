module.exports = {
    name: 'kick',
    description:'Tag a member and kick them',
    guildOnly: true,

    async execute(message){
        if(!message.mentions.users.size){
            return message.reply('you need to tag a user in order to kick them.');
        }

        let taggedUser = message.guild.member(message.mentions.members.first());

        message.channel.send(`Tagged user has been kicked.`);

        taggedUser.sendMessage(`You have been kicked from ${message.guild.name}.`);
        taggedUser.kick();

        
    },

};