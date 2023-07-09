module.exports = {

    commands: 'purge',
    expectedArgs: '<number>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    //description:'delete up to 99 messages',
    callback: (message, arguments) => {

           
        const amount = parseInt(arguments[0])+1;

        if(isNaN(amount)){
            return message.reply('that doesn\'t seem to be a valid number.');

        }
        else if(amount <= 1 || amount > 100){
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to delete messages in this channel.');

        });
        },
    
        requiredRoles:['Admin'],
        
};