const { Client, Collection } = require("discord.js");
const Logger = require("./Logger.js");

class Bot extends Client {
    constructor(options) {
        super(options);

        /**
         * Logger for the Bot
         * @type {Logger}
         */
        this.Logger = new Logger()

        /**
         * The position in the array of the status messages of the current status message.
         * @type {Number}
         */
        this.currentStatus = 0;

        /**
         * Collection of all commands
         */
        this.commands = new Collection()

    }

    between(min, max) {
        return Math.floor(
            Math.random() * (max - min) + min
        );
    }

    get config() {
        return require("../../config/config.js");
    }

}

module.exports = Bot;
