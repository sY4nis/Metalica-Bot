// permet d'acceder au token du bot 
require('dotenv').config();
const axios = require('axios');

//charge discord.js
const { Client, GatewayIntentBits } = require('discord.js');


async function parsePokemon(fileContent, name){
    const pokemon = fileContent;
    const position = pokemon.indexOf(`\t${name}: {`);
    console.log(`position trouvée : ${position}`);
    if(position == -1){
        console.log(`${name} is not a pokemon`)
        return null;
    }
    let end = 0;
    let counter = 0;
    let started = false;
    for (let i = position; i < fileContent.length; i++) {
        if (fileContent[i] == '{'){
            counter +=1;
            started = true;
        }
        if (fileContent[i] == '}'){
            counter -=1;
        }
        if (started && counter === 0 && i > position) {
            end = i;
            break;
        }
    }
    return fileContent.substring(position, end);
}

async function fetchPokedex() {
    const response = await axios.get(process.env.POKEDEX_URL, {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });
    return response.data;
}

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
client.on('messageCreate', async(message) => {
    if (message.author.bot) return;
    const args = message.content.split(' ');

    //minuscule pour que ça fonctionne avec n'importe quel dt
    const command = args[0].toLowerCase();

    if (command === '!dt') {
        const fileContent = await fetchPokedex();
        const result = await parsePokemon(fileContent, args[1]);
        let req = args[1];
        console.log(`Requested pokemon : ${req}`);
        console.log(`${result}`);
    }
});

client.login(process.env.DISCORD_TOKEN);