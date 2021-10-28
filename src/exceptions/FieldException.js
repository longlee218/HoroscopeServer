const {Exception} = require("./Exception");

module.exports = class FieldException extends Exception {
    constructor(message) {
        super(message);
    }
};
