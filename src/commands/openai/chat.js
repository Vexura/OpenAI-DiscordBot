const { MessageEmbed, CommandInteraction } = require('discord.js');
const Command = require("../../classes/Command.js");
const { Configuration, OpenAIApi } = require("openai");

class ChatCommand extends Command {
    constructor(client) {
        super(client, {
            name:"chat",
            description:"Schreibe mit der AI",
            options: [
                {
                    name: "create",
                    description: "Schreibe mit dem Bot",
                    type: 1,
                    options: [
                        {
                            type: 3, name: "text", description: "Deine Message (Englisch nur)", required: true
                        }
                    ]
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

        if(commandArgs[0].name === "create") {
            let args = commandArgs[0].options;
            const description = args[0].value;
            const configuration = new Configuration({
                apiKey: client.config.openAPIKey,
            });
            const openai = new OpenAIApi(configuration);
            try {
                const completion = await openai.createCompletion({
                    model: "text-davinci-002",
                    prompt: description,
                    temperature: 0,
                    max_tokens: 250,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                });

                const embed = new MessageEmbed()
                    .setTitle("OpenAI - Chat")
                    .setDescription(completion.data.choices[0].text)
                    .setColor("RANDOM")
                    .setTimestamp();
                return this.response(embed);
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

module.exports = ChatCommand;
