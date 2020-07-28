const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {

    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ]

      for (const permission of permissions){
          if(!validPermissions.includes(permission)){ //checks for valid permission against list of valid perms
              throw new Error(`Unknown permission node "${permission}"`)
          }
      }

}

module.exports = (client, commandOptions) => {

    let{
        commands,
        expectedArgs = '',
        permissionError = "You do not have permission to run this command.",
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions


    //put commmand into an array if its a string
    if( typeof commands === 'string') {
        commands = [commands]
    }

    //console.log(`Registering command "${commands[0]}"`)

    //check if permissions exist, and then put it in an array
    if(permissions.length){
        
        if(typeof permissions === 'string') {
            permissions = [permissions]
        }

        //call function to check if command has valid permissions
        validatePermissions(permissions)
    }



    client.on('message', (message) => {

        const { member, content, guild} = message
        
        //checks commands array parameter for command name and any aliases
        for(const alias of commands) {
            const command = `${prefix}${alias.toLowerCase()}`

            //if message content has a command
            if(content.toLowerCase().startsWith(`${command} `) ||
               content.toLowerCase() === command)
               {
                    //if member does not have valid perms
                    for(const permission of permissions) {
                        if(!member.hasPermission(permission)){
                            message.reply(permissionError);
                            return;
                        }
                    }

                    //check if member has required roles to run command
                    for( const requiredRole of requiredRoles) {

                        const role = guild.roles.cache.find((role) => role.name = requiredRole)

                        if (!role || !member.roles.cache.has(role.id)){
                            message.reply(`You must have the "${requiredRole}" role to use this command.`)
                            return;
                        }

                    } 
                    
                    //splits for any amount of spaces
                    const arguments = content.split(/[ ]+/)

                    //function to remove 1st element of an array(arguments array 1st element is the command)
                    arguments.shift()

                    //correct number of args
                    if (
                        arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                        message.reply(`Incorrect syntax. The proper usage would be: ${prefix}${alias} ${expectedArgs}`)
                        return
                    }

                    //handles command code  
                    callback(message, arguments, arguments.join(' '), client)
                    
                    return
                    
               }

        }

    })

    

}

