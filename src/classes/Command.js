const { MessageEmbed, CommandInteraction } = require("discord.js");
const {EmbedBuilder} = require('@discordjs/builders');
const fs = require("fs").promises
const Bot = require("./Bot.js")
const Logger = require("./Logger.js")

class BaseCommand {
    constructor(client, {
        description = "",
		name = "Beispiel Command",

		adminOnly = false,

        ephemeral = false,

		options = []
    }) {
        /**
         * The {@link Bot} the Command belongs to.
         * @type {Bot}
         */
		this.client = client;

		this.config = { adminOnly, options, ephemeral };
		this.help = { name, description, adminOnly };
		this.interaction = null;

        /**
         * @type {Logger}
         */
        this.Logger = client?.Logger
    }


    /**
     *
     * @param {CommandInteraction} interaction
     */

	async run(interaction) {
        this.Logger.warn("Ended up in command.js [" + this.config + "]")
    };

    /**
     *
     * @param {String} guildId
     */

	async initialize(guildId) {
        let guild = await this.client.guilds.fetch(guildId)
        if(!guild) return this.Logger.error("Guild konnte nicht gefunden werden (cmd initialize)")

        guild.commands.create({
            name: this.help.name,
            description: this.help.description,
            defaultPermission: true,
            options: this.config.options
        }).then(cmd => {
            this.Logger.info(`Created ${this.help.name}`, "CMD-Deployer");
        }).catch(this.client.Logger.error);
	}

    /**
     *
     * @param {MessageEmbed | String | MessageEmbed[] | EmbedBuilder[] | embeds: MessageEmbed[]} input
     * @param {Array} components
     * @returns
     */

	async response(input, components = [], ephemeral = false) {
        if(ephemeral) {
            return await this.interaction.reply({ ephemeral: true, embeds: [ input ]})
        } else if(typeof input === "object") {
            if(input.description || input.color || input.fields) return await this.interaction.editReply({ embeds: [ input ], components: components }).catch(this.client.Logger.error);
            else return await this.interaction.editReply({ embeds: input, components: components }).catch(this.client.Logger.error)
        } else if(typeof input === "string") {
            return await this.interaction.editReply({ content: input, components: components }).catch(this.client.Logger.error);
        }
	}

    /**
     *
     * @param {String} text
     * @returns
     */
	error(text, ephemeral = false) {
        if(ephemeral) return this.interaction.reply({ embeds: [new MessageEmbed().setColor('#ff0000').setDescription(":x: " + text)], ephemeral: false }).catch(this.client.Logger.error);
        return this.interaction.editReply({ embeds: [new MessageEmbed().setColor('#ff0000').setDescription(":x: " + text)] }).catch(this.client.Logger.error);
	}

	get rest() {
        return this.client.api;
    }


    delete() {
        this.rest.applications(this.client.user.id).guilds(this.client.config.guild).commands.post({
            data: {
                name: this.help.name,
                description: this.help.description,
                options: this.config.options
            }
        }).catch(e => { console.log(e) })
    }


    /**
     *
     * @param {String} query
     */

    async queryHandler(query ) {
        this.Logger.warn("Ended up in command.js [" + this.config + "]");
        return [];
    }
}

module.exports = BaseCommand;
