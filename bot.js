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

client.login(process.env.DISCORD_TOKEN);