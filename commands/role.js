module.exports ={
    name:'role',
    description:'Add/remove roles, or list all available roles in server.',

   async execute(message, args){


       //admins can set a list of roles that can be added by any user
       //ex: !role allow Invader 

       
       let roleName = args.slice(1).join(' ');
       let role = message.guild.roles.find(r => r.name.toLowerCase() === roleName);
       var allowedRoles;

       if(args[0].toLowerCase() === 'allow'){

        


       }


        if(args[0].toLowerCase() === 'list'){
            message.reply('Avaliable roles: ');//update to display available roles for given guild(server) that is set by admin
        }
        else{

        if(!role){
          return message.reply("That role does not exist.");
        }



        

        



        let member = message.member;

        

        if(args[0].toLowerCase() === 'add'){
          await member.addRole(role).catch(console.error);
         return message.reply("Role has been added.");
        }
        else if(args[0].toLowerCase() == 'remove'){
          await member.removeRole(role).catch(console.error);
         return message.reply("Role has been removed.");
        }
        
        

    }
        
    }

}