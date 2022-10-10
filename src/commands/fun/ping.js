const { CommandInteraction } = require('discord.js');
const Command = require("../../classes/Command.js");
const Bot = require("../../classes/Bot.js")

class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name:"ping",
            description:"Zeigt den Ping vom Bot."
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */   

    async run(interaction, client) {
        const options = interaction.options;
        const args = options.data;

        return this.response(`🏓 Die API Latenz beträgt ${Math.round(client.ws.ping)}ms 🏓`);
    };
};

module.exports = PingCommand;
