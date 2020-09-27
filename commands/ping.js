module.exports = {
    name: 'ping',
    aliases: ['peng','pang'],
    cooldown: 5,
    description: 'Ping!',
    execute(message, args){
        message.channel.send('Pong!');
    },
};