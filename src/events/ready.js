const BaseEvent = require("../classes/Event.js");

module.exports = class extends BaseEvent {
    constructor() {
        super('ready');
    };

    /**
     *
     * @param {Bot} client
     */

    async run(client) {
        client.Logger.info(`Logged in at ${new Date().toLocaleString().replace(",","")} as ${client.user.tag} [${client.user.id}]`, "CLIENT")

        client.commands.forEach(command => {
            command.initialize(client.config.guildId); //
        });

        setInterval(() => {
            let statusMessages = client.config.statusMessages;
            if(client.currentStatus === (statusMessages.length-1)) client.currentStatus = 0;
            client.user.setPresence({
                status: "dnd",
                activities: [
                    {
                        name: statusMessages[client.currentStatus],
                        type: "PLAYING"
                    }
                ],
                afk: false
            })
        }, 60 * 1000)
    };
};



