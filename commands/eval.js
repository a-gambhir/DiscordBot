const { MessageEmbed } = require("discord.js");
const beautify = require("beautify")
//const ownerID = require('./config.json');

module.exports = {

    name:'eval',
    description:'Executes given javascript code',

    execute(client, message, args){

        
        if(message.author.id !== "83549337212157952")  {
            return message.reply("Only the bot owner can use this command.");
        }
        
        if(!args[0]) {
            message.channel.send("There is no code to evaluate")
        }

            try{

                const code = args.join(" ");
                let evaluated = eval(code);
    
                let embed = new MessageEmbed()
                    .setTimestamp()
                    .setFooter(client.user.username)
                    .setTitle("Eval")
                    .addField("Code to evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``) //beautify formats code to look nicer
                    .addField("Evaluated:", evaluated)

                    message.channel.send(embed);


            } catch(err) {
                let embed = new MessageEmbed()
                .setTitle("\:x: Error")
                .setDescription(e)
                .setFooter(client.user.username)
    
            }

        
        
        
        

    }

}