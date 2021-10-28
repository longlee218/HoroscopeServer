"use-strict";

require("dotenv").config();
const config = require("../config");

module.exports = class Environment {
  static getName() {
    return process.env.NODE_ENV || "development";
  }

  static isTest() {
    return this.getName() === "test";
  }

  static isDevelopment() {
    return this.getName() === "development";
  }

  static isProduction() {
    return this.getName() === "production";
  }

  static getConfig() {
    return config[this.getName()];
  }
};
