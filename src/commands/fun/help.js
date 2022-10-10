const { CommandInteraction, MessageEmbed } = require('discord.js');
const Command = require("../../classes/Command.js");

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name:"help",
            description:"Zeigt Hilfe zum Bot an."
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */

    async run(interaction, client) {
        const options = interaction.options;

        let helpEmbed = new MessageEmbed()
            .setColor('Blue')
            .setTitle('Hilfe');

        client.commands.forEach(cmd => {
            if(!cmd.help.adminOnly) helpEmbed.addField(cmd.help.name, cmd.help.description)
        });


        return this.response(helpEmbed);
    };
}

module.exports = HelpCommand;
