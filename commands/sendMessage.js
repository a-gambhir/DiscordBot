module.exports = {
    commands:'sendMessage',
    //description:'Sends a message through the bot to a given channel',
    //guildOnly: true,

   callback: (message, args) => {

        let channel = args[0];

        channel.send(args[1]);


    },

}