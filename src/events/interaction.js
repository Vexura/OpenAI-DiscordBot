const { CommandInteraction } = require("discord.js");
const BaseEvent = require("../classes/Event.js");

module.exports = class extends BaseEvent {
    constructor() {
        super('interactionCreate');
    };

    /**
     *
     * @param {Bot} client
     * @param {CommandInteraction} interaction
     */

    async run(client, interaction) {
        if(!interaction.guild) return;
        if(interaction.type === "APPLICATION_COMMAND") {
            let command = client.commands.get(interaction.commandName)
            if(!command) return

            if(command.help.adminOnly && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: ":x: Du hast keine Rechte auf diesen Befehl.", ephemeral: true })

            command.interaction = interaction;

            if(command.config.ephemeral !== true) await interaction.deferReply().catch(e => {
                return client.Logger.error(e);
            });

            return command.run(interaction, client)
        }
    };
};
