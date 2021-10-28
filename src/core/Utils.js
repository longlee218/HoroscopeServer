const NotFoundException = require("../exceptions");

module.exports = class Utils {
  static isEmpty(list) {
    return !Utils.hasResults(list);
  }

  static hasResults(list) {
    return typeof list === "object" && list && list.length
      ? list.length > 0
      : false;
  }

  static assertResult(result, idOrKey) {
    if (result === null) {
      throw new NotFoundException(`${idOrKey}`);
    }
  }

  static assertResults(list, idOrKey) {
    if (!Utils.hasResults(list)) {
      throw new NotFoundException(`${idOrKey}`);
    }
  }

  static single(list) {
    return Utils.hasResults(list) ? list[0] : null;
  }

  static isPositve(number) {
    return number >= 0;
  }
};
