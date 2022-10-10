const {MessageEmbed, CommandInteraction} = require('discord.js');
const Command = require("../../../classes/Command.js");
const Dalle = import("dalle-node");

class ImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "image", description: "Erstelle ein Random bild mit deiner Beschreibung", options: [{
                name: "create", description: "Creates a new Image", type: 1, options: [{
                    type: 3, name: "description", description: "Beschreibung wie das bild aussehen soll", required: true
                }]
            }]
        });
    };

    /**
     * @param {CommandInteraction} interaction
     * @param {Bot} client
     */

    async run(interaction, client) {
        const options = interaction.options;
        const commandArgs = options.data;

        if (commandArgs[0].name === "create") {
            let args = commandArgs[0].options;
            const description = args[0].value;
            try {
                const dalle = new (await Dalle).Dalle(client.config.openAPIDalle);
                const generations = await dalle.generate(description);
                return await this.interaction.editReply({
                    embeds: [{
                        "title": "Response from DALL·E",
                        "color": 5814783,
                        "url": generations.data[0].generation.image_path,
                        "image": {
                            "url": generations.data[0].generation.image_path
                        }
                    }, {
                        "url": generations.data[1].generation.image_path, "image": {
                            "url": generations.data[1].generation.image_path
                        }
                    }, {
                        "url": generations.data[2].generation.image_path, "image": {
                            "url": generations.data[2].generation.image_path
                        }
                    }, {
                        "url": generations.data[3].generation.image_path, "image": {
                            "url": generations.data[3].generation.image_path
                        }
                    }],
                });
            } catch (error) {
                    const embed = new MessageEmbed()
                        .setTitle("OpenAI - Fehler")
                        .setDescription(error.message)
                        .setColor("RED")
                        .setTimestamp();
                    return this.response(embed);
            }
        }
    };
}

module.exports = ImageCommand;
