module.exports = { //module.exports allows this command to be used in other files with require()
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    //guildOnly: true,

    execute(message, args) {

        message.channel.send('Pong!');

    },
};