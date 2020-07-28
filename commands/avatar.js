module.exports = {
	commands: ['avatar', 'pfp', 'icon'],
	expectedArgs:'@user',
	minArgs: 0,
    maxArgs: 1,
	//description: 'Get the avatar URL of tagged user or self',
	callback: (message) => {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
	},
};