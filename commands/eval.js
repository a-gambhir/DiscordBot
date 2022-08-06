const { RichEmbed } = require("discord.js");
const Discord = require('discord.js');
const beautify = require("beautify");
//const ownerID = require('./config.json');

module.exports = {

    commands:'eval',
    
    
    //description:'Executes given javascript code',

    callback:async (message, args) => {

        
        if(message.author.id !== "83549337212157952")  {
            return message.reply("Only the bot owner can use this command.")
            //.then(m => m.delete({ timeout: 5000}));

        }
        
        if(!args[0]) {
            message.channel.send("There is no code to evaluate")
            //.then(m => m.delete({ timeout: 5000}));


        }

            try{

                const code = args.join(" ");
                let evaluated = eval(code);
    
                let embed = new Discord.MessageEmbed()
                    .setTimestamp()
                    //.setFooter(client.user.username)
                    .setTitle("Eval")
                    .addField("Code to evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``) //beautify formats code to look nicer
                    .addField("Result:", evaluated)

                    message.channel.send(embed);


            } catch(err) {
                let embed = new Discord.MessageEmbed()
                .setTitle("\:x: Error")
                .setDescription(err)
               // .setFooter(client.user.username)
    
                message.channel.send(embed);
            }

        
        
        
        

    }

}