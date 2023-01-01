const ytdl = require('ytdl-core');
const play = require('play-dl');
const ytSearch = require('yt-search');
const queue = new Map();
const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['play','skip', 'stop', 'queue'],
    expectedArgs:'<URL>',

    //YTDL-CORE NOT WORKING PROPERLY ON NODE JS 16? 

    callback: async (message, args) => {

        const voice_channel = message.member.voice.channel;

        if(!voice_channel) return message.channel.send('You need to be in a voice channel to use this command!');
        
        const permissions = voice_channel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send('You do not have the correct permissions to use this command.');
        if(!permissions.has('SPEAK')) return message.channel.send('You do not have the correct permissions to use this command.');

        const server_queue = queue.get(message.guild.id);


        if(message.content.includes('play')){
            console.log("play")
            if(!args.length) return message.channel.send('You need to provide a URL or song name!');
            let song = {}

            if(ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                //const song_info = await ytdl.downloadFromInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url}
            } else{
                //If video is not a URL then use keywords to find video
                const video_finder = async(query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if(video){
                    song = { title: video.title, url: video.url}
                } else {
                    message.channel.send('There was an error finding the video.');
                }
            }


            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song)

                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch(err){
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }

            }else{
                server_queue.songs.push(song);

                //console.log(server_queue)

                return message.channel.send(`***${song.title}*** has been added to the queue!`);
            }
        }

        else if(message.content.includes('skip')) skip_song(message, server_queue);
        else if(message.content.includes('stop')) stop_song(message, server_queue);
        else if(message.content.includes('queue')) view_queue(message, server_queue);
          
    }



}

        //function to play the audio from the video
        const video_player = async (guild, song) => {
            const song_queue = queue.get(guild.id);
        
            if(!song){
                console.log("no more songs")
                song_queue.voice_channel.leave();
                queue.delete(guild.id);
                return;
            }
    

            const stream = ytdl(song.url, {
                filter: "audioonly",
                highWaterMark: 1 << 62,
                liveBuffer: 1 << 62,
                dlChunkSize: 0, 
                bitrate: 192000,
                quality: "lowestaudio",
           }).on('error', err => {console.log(err)});
            //const stream  = play.stream(song.url, {discordPlayerCompatibility: true,});
            
              song_queue.connection.play(stream, { seek: 0, volume: 0.5 }) 
            .on('finish', () => {
               
                song_queue.songs.shift();
                video_player(guild, song_queue.songs[0]);
            });
            await song_queue.text_channel.send(`Now playing **${song.title}**`);
        }

        //function to skip song
        const skip_song = (message, server_queue) => {
            if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this command!');
            console.log("skip")
            if(!server_queue){
                return message.channel.send('There are no songs in the queue.');
            }
            server_queue.connection.dispatcher.end();
        }

        //function to stop playing audio 
        const stop_song = (message, server_queue) => {
            if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this command!');
            console.log("stop")
            server_queue.songs = [];
            server_queue.connection.dispatcher.end();

        }

        //function to view the queue
        const view_queue = (message, server_queue) => {
            console.log("queue")
            if(!server_queue){
                return message.channel.send('There are no songs in the queue.');
            }
            //print out queue
            else{
                const queueList = server_queue.songs.map((song, i) => `[${++i}] - ${song.title}`);
                const queueEmbed = new MessageEmbed().setDescription(queueList);
                return message.channel.send(queueEmbed);

            }



        }