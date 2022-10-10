const { CommandInteraction } = require('discord.js');
const Command = require("../../classes/Command.js");
const Bot = require("../../classes/Bot.js")

class ReloadCommand extends Command {
    constructor(client) {
        super(client, {
            name:"reload",
            description:"Läd alle Befehle und Events neu.",
            adminOnly: true,
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */

    async run(interaction, client) {

        //await require("../../functions/register").registerEvents(client, '../events');
        //await require("../../functions/register").registerCommands(client, '../commands');

       return interaction.channel.send(`Soon`);
    };
}

module.exports = ReloadCommand;
