const {ApolloError} = require('apollo-server-errors');

module.exports = class MyError extends ApolloError {
    constructor(message) {
        super(message, 'MY_ERROR_CODE');
        Object.defineProperty(this, 'name', {value: 'MyError'});
    }
}
