# Discord Bot(IN DEVELOPMENT)
A Discord Bot made in discord.js originally supplement the Scarlet Smash club's discord server at Rutgers University. The bot was used to aid in moderation of the server and guided new users through a welcome process. Utilizes a command handler that dynamically executes commands and makes it easy to create many different commands. Now it is being updated for personal use.

# Current Features<br /> 
-Commands for moderation of a server<br />
-Audit log for deleted and edited messages-bot requires VIEW_AUDIT_LOGS permission(audit log only works if channel name is "logs")<br /> 
-Get roles by reacting to a certain message<br />
-Play YouTube audio in a voice chat using a search feature or direct URL, can queue multiple songs, skip songs in the queue, or stop.<br />


Command List<br /> 
    -Avatar: Gets avatar url of a user<br />
    -Ban: Bans a tagged user<br />
    -Help: Sends a DM with a list of all available commands or info about a specific command<br />
    -Listcommands: Produces a list of all of the bot's commands in that server in an embedded message.<br />
    -Kick: Kicks a tagged user<br />
    -Mute/Unmute: Mutes a tagged user for a given amount of time<br />
    -Purge: Deletes up to 99 messages<br />
    -Role: Add/remove/list roles for the server<br />
    -Server: Provides server name and members<br />
    -User-info: Provides username and id<br />
    -Eval: Evaluates given javascript code<br />
    -Connect: Connects to a given MySQL database<br />
    -Play: Plays audio from a Youtube URL or by searching a video name in a voice chat. If a song is already playing, adds it to the bottom of the queue.<br />
    -Skip: Skips the current song, plays the next song if there are more songs in the queue.<br />
    -Stop: Stops the bot from playing audio, resets the queue.<br />

# To do List<br /> 
-Add a command to view the current song queue.<br />
-Add permission requirements to the music commands.<br />
-BOT CRASHES ON MESSAGES WITH PREFIX THAT ARE NOT COMMAND<br />
-sendMessage command- not working<br />
-Add a command to set welcome messages in given channel<br />
-Update help command with new command handler features<br />
-Fix listcommands<br />
-Create command to set channel to receive audit log messages<br />
-Schedule messages(announcements)<br />
-Update role reactions to be a modular command to work on any guild<br />
-Implement webhooks(twitch/twitter/etc)<br /> 
-Support for custom commands<br />


