module.exports = {
    name: 'role',
    description: 'Give someone a role',
    args: true,
    usage: '<user> <role>',
    execute(message, args){
        message.channel.send('Pong!');
    },
};