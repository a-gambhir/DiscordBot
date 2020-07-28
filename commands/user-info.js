module.exports = {
    commands:['user-info','userinfo'],
    minArgs:0,
    maxArgs:1,

    //description:'username and id',

    callback: (message,args) => {

        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        
    },
    


}