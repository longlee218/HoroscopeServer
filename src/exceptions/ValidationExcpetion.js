const {Exception} = require("./Exception");

module.exports = class ValidationException extends Exception {
    constructor(message) {
        super(message);
    }
};
