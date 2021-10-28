/**
 * Annotation '@exception' to give the exception a name and a key
 */
// Used to identify UserErrors
const IsException = Symbol();

// UserErrors will be sent to the user
class Exception extends Error {
    static Seperator = ":";
    static Name = "UnknownException";

    constructor(args) {
        super(args[0]);
        this.name = Exception.Name;
        this.message = args[0];
        this[IsException] = true;
        Error.captureStackTrace(this);
    }

    toString() {
        return `${this.constructor.name}:${this.message}`;
    }

    static hasName(error) {
        let message = error;
        if (error.message) {
            message = error.message;
        }
        const reg = new RegExp("^[a-zA-Z]+:");
        return reg.test(message);
    }

    static getName(message) {
        if (Exception.hasName(message)) {
            return message.split(Exception.Seperator)[0];
        }
        return Exception.Name;
    }

    static getMessage(message) {
        if (Exception.hasName(message)) {
            return message.split(Exception.Seperator)[1];
        }
        return message;
    }
}

module.exports = {Exception, IsException};
