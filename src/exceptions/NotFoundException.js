const {Exception} = require("./Exception");

module.exports = class NotFoundException extends Exception {
  constructor(id) {
    super(`Entity with identifier ${id} does not exist`);
  }
};
