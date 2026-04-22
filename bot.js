// permet d'acceder au token du bot 
require('dotenv').config();

//charge discord.js
const { Client, GatewayIntentBits } = require('discord.js');


//creer le bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('clientReady', () => {
    console.log(`Connecté en tant que ${client.user.tag} !`);
});

//ecoute h24 
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    const args = message.content.split(' ');

    //minuscule pour que ça fonctionne avec n'importe quel dt
    const command = args[0].toLowerCase();

    if (command === '!dt') {
        const pokemon = args[1];
        console.log(`Requested pokemon : ${pokemon}`);
        console.log(message.content);
    }
});

client.login(process.env.DISCORD_TOKEN);