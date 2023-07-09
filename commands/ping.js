module.exports = { //module.exports allows this command to be used in other files with require()
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
      console.log("Ping!")
      message.reply('Pong!')
    },
  }