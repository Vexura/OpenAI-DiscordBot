const { MessageEmbed, CommandInteraction } = require('discord.js');
const Command = require("../../../classes/Command.js");
const Dalle = import("dalle-node");
class CreditsCommand extends Command {
    constructor(client) {
        super(client, {
            name:"imagecredits",
            description:"Bekomme verfügbare Credits",
            adminOnly: true
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */

    async run(interaction, client) {
        const dalle = new (await Dalle).Dalle(client.config.openAPIDalle);
        const creditsSummary = await dalle.getCredits();

        const embed = new MessageEmbed()
            .setTitle("OpenAI Credits")
            .setDescription(`Du hast noch ${creditsSummary.aggregate_credits} Credits verfügbar.`)
            .setColor("RANDOM")
            .setTimestamp();
        return this.response(embed);
    };
}

module.exports = CreditsCommand;
