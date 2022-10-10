(async () => {
    const { Intents } = require("discord.js");
    const Bot = require("./src/classes/Bot.js");

    const client = new Bot({
        partials: ['MESSAGE', 'CHANNEL', "REACTION"],
        fetchAllMembers: false,
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_WEBHOOKS
        ]
    })


    await require("./src/functions/register").registerEvents(client, '../events');
    await require("./src/functions/register").registerCommands(client, '../commands');

    await client.login(client.config.token);
})()

