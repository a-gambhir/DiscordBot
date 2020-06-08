module.exports = {
    name: 'unmute',
    description:'Tag a user and unmute them.',
    guildOnly: true,


    execute(message,args){

        if(message.member.roles.find(r => r.name === "Admin")){
            
            console.log("Role found");
             
            
            if(!message.mentions.users.size){
                return message.reply('You need to tag a user in order to unmute them.')
            }

            let taggedUser = message.mentions.members.first();

            const muteRole = taggedUser.roles.find(role => role.name === 'Muted');                

            if(!muteRole){
                return message.reply('user has not been muted.')       
            }
            else{
                taggedUser.removeRole(muteRole);
                return message.reply("user has been unmuted.");
            }


        }
        else{
            return message.reply('You do not have permission to perform that action.');

        }

    }

}