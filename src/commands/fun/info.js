const { MessageEmbed, CommandInteraction } = require('discord.js');
const Command = require("../../classes/Command.js");

class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name:"info",
            description:"Erhalte alle Informationen zum Bot."
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */

    async run(interaction, client) {
        const options = interaction.options;

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;

        const infoEmbed = new MessageEmbed()
            .setColor('#0037ff')
            .setTitle('Informationen')
            .setThumbnail(`${client.config.info_thubnail}`)
            .addField('• Ping', `${Math.round(client.ws.ping)}ms`)
            .addField('• Uptime', `${uptime}`)
            .addField('• Version', `${client.config.version}`)
            .addField('• Developer', 'CookieMC337')
            .setTimestamp()
            .setFooter('Dieser bot ist in der BETA');

        return this.response(infoEmbed)
    };
}

module.exports = InfoCommand;
