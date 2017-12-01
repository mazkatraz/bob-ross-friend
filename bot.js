var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    //apparently bot-ception is a thing so its best to not let bots talk to each other, for now
    if (message.author) return; //message.author is undefined

    //ignore anything that doesnt start with '!'
    if (message.substring(0, 1) != '!') return;

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
			case 'fightme':
				// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
				// To get the "message" itself we join the `args` back into a string with spaces: 
				//const sayMessage = args.join(" ");
				// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
				//message.delete().catch(O_o => {});
				bot.sendMessage({
                    to: channelID,
                    message: "Square up, " + user + '.'
                });
				break;
			case 'bob':
				if (message.toLowerCase().includes("bob")) {
					bot.sendMessage({
						to: channelID,
						message: "Well hello there, " + user + '.'
					});
				}
                // Just add any case commands if you want to..
        }
    }

});