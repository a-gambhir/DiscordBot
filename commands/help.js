const{prefix} = require('../config.json');

module.exports = { 
    name: 'help',
    description: 'DMs user all available commands or info about a specific command.', 
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    
    execute(message, args){

        const data = [];
        const{commands} = message.client;

        if(!args.length){
            data.push('Here\'s a list of all my commands:'); //.push() dms to messsage author after appending info
            data.push(commands.map(command => command.name).join(', ')); //.map over commands Collection, appends to data var(array)
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`);

            return message.author.send(data, { split : true }).then(() => {
                if(message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all of my commands.');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.authos.tag}.\n`,error);
                message.reply('I am unable to DM you, do you have DMs disabled?');
            });
        }
        
        //sending help message for specified command
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return message.reply('that\s not a valid command.');
        }

        data.push(`**Name: ${command.name}`);

        if(command.aliases) data.push(`**Aliases:**${command.aliases.join(', ')}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, {split: true});



    }

}