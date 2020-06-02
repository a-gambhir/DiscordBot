module.exports = {
    name: 'kick',
    description:'Tag a member and kick them',
    guildOnly: true,

    async execute(message){
    
        if(message.member.hasPermission('KICK_MEMBERS')){  //performs a check for permissions, also check if they have the admin role

            if(!message.mentions.users.size){
                return message.reply('You need to tag a user in order to kick them.');
            }

            let taggedUser = message.guild.member(message.mentions.members.first());

            message.channel.send(`Tagged user has been kicked.`);

            taggedUser.sendMessage(`You have been kicked from ${message.guild.name}.`);
            taggedUser.kick();

        }
        else{
            return message.reply('You do not have permission to perform that action.');
        }

        

        
    },

};