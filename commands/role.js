module.exports ={
    name:'role',
    description:'Add/remove roles, or list all available roles in server.',

   async execute(message, args){


        if(args[0].toLowerCase() === 'list'){
            message.reply('Avaliable roles: Scarlet Smasher, Invader, Alumni, Wi-Fi');//update to display w/embed
        }
        else{
        
        let roleName = args[1].toLowerCase();//works for roles with 2 names too
        let role = message.guild.roles.find(r => r.name.toLowerCase() === roleName);
        let member = message.member;

        if(args[2]){
        
        let roleName2 = args[2].toLowerCase();    
        role = message.guild.roles.find(r => r.name.toLowerCase() == roleName + " " + roleName2);    

        }
        else{
        
        }

        if(args[0].toLowerCase() === 'add'){
          await member.addRole(role).catch(console.error);
          message.reply("Role has been added.");
        }
        else if(args[0].toLowerCase() == 'remove'){
          await member.removeRole(role).catch(console.error);
          message.reply("Role has been removed.");
        }
        
        

    }
        
    }

}