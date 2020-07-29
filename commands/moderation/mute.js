module.exports = {
  commands: 'mute',
  expectedArgs: '<@user> <time>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 1,
  maxArgs: 2,
  requiredRoles:['Admin'],  

  //description:'Tag a user and mute them for a certain amount of time',
  //guildOnly: true,
  
    callback:async (message,args) => {

      let muteRole = message.guild.roles.find(`name`,"Muted");
      let taggedUser = message.mentions.members.first() || message.guild.members.get(args[0]);//message.guild.members.get returns user id, either method in or statement works
      let hasMuteRole = taggedUser.roles.find(role => role.name === 'Muted');    
      

        if(!hasMuteRole){

        const ms = require("ms");
  
        if(!message.mentions.users.size){
            return message.reply('You need to tag a user in order to mute them.')
        }
            
    
          if(!muteRole) { //if "Muted" role does not exist in server, create it
          try{
              muteRole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions:[]
              })  
              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  SEND_TTS_MEsSAGES: false,
                  ATTACH_FILES: false,
                  CONNECT: false,
                  SPEAK: false
                });
              });
          }catch(e){
            console.log(e.stack);
          }
        }
    
        let muteTime = args[1];
         
        if(!muteTime){

          //return message.reply("You did not specify a time.").catch(err => console.log(err));

          await(taggedUser.addRole(muteRole.id));
          message.reply(`${taggedUser.user.username} has been muted.`);

        }
        else{

          await(taggedUser.addRole(muteRole.id));
        message.reply(`${taggedUser.user.username} has been muted for ${ms(ms(muteTime), {long: true})}.`);



          setTimeout(function(){
            taggedUser.removeRole(muteRole.id);
            message.channel.send(`${taggedUser.user.username} has been unmuted.`);
          }, ms(muteTime));

        }
    

      }
      else{
        return message.reply('User is already muted.');

      } 

  
      },
      

  };