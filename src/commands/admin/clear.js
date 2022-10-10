const { CommandInteraction } = require('discord.js');
const Command = require("../../classes/Command.js");
const Bot = require("../../classes/Bot.js")

class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name:"clear",
            description:"Löscht mehrere Nachrichten in einem Kanal.",
            adminOnly: true,
            options: [{
                name: "amount",
                description: "The amount of messages to clear.",
                type: 3,
                required: true
            }]
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */   

    async run(interaction, client) {
        const options = interaction.options;
        const args = options.data;

       if(!args[0] || !args[0]?.value) return this.error("Du musst eine Menge angeben.");
       let amout = args[0].value;

       let channel = interaction.channel;
       let messages = await channel.bulkDelete((amout < 100) ? amout : 100, true);

       let wait = require("util").promisify(setTimeout)
       await wait(500)

       return interaction.channel.send(`\`${messages.size}\` Nachrichten wurden gelöscht.`);
    };
};

module.exports = ClearCommand;
