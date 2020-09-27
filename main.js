var fs = require('fs');
const {prefix, token} = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

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
    const commandName = args.shift().toLowerCase();

    //Check command name and aliases
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;

    //Check command argument usage
    if(command.args && !args.length){
        let reply = `You didn't provide any arguments. ${message.author}!`;

        if(command.usage){
            reply += `\nthe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;   
        }
        
        return message.channel.send(reply);
    }

    //Command Cooldowns
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command.`);
        }
    }
    else{
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    

    //Execution
    try {
        command.execute(message, args);
    } catch(error){
        console.error(error);
        message.reply('Woops! We had trouble running that command.');
    }

});

client.login(token);

