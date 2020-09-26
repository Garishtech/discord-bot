var fs = require('fs');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});


/*
//Simple message read form
    else if (message.content === `${prefix}`){
        message.channel.send('');
    }
*/

client.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (message.content === `${prefix}ping`){
        message.channel.send('Pong!');
    }
    //List of commands
    else if (message.content === `${prefix}help`){
        message.channel.send('');
    }
    //
    else if (message.content.startsWith(`${prefix} `)){
        message.channel.send('Spacey');
    }

    else if (cmd === 'args-info') {
        if(!args.length){
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);

        }
    }

});

client.login(token);

