const express = require("express");
const { Logger } = require("./Logger");

const log = Logger("app:core:server");
module.exports = class Server {
  static init() {
    return express();
  }

  static run(app, port) {
    const server = app.listen(this.normalizePort(port));
    server.on("listening", () => this.onListening(server));
    server.on("error", (error) => this.onError(server, error));
  }

  static onListening(server) {
    log.debug(`Listening on ${this.#bind(server.address())}`);
  }

  static onError(server, error) {
    if (error["syscall"] !== "listen") {
      throw error;
    }
    const addr = server.address();
    // handle specific listen errors with friendly messages
    switch (error["code"]) {
      case "EACCES":
        log.error(`${this.#bind(addr)} requires elevated privileges`);
        break;
      case "EADDRINUSE":
        log.error(`${this.#bind(addr)} is already in use`);
        break;
      default:
        throw error;
    }
  }

  static normalizePort(port) {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
      // named pipe
      return port;
    }
    if (parsedPort >= 0) {
      // port number
      return parsedPort;
    }
    return false;
  }

  static #bind(addr) {
    return typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  }
};
