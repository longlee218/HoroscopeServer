module.exports = {
  /**
   * Development Environment
   * ------------------------------------------
   *
   * This is the local development environment, which is used by the developoers
   */
  development: {
    database: {
      couchbase: {
        connection: "couchbase://192.168.1.253:8091",
        bucket: "horoscope",
        client: "couchbase",
        migrations: {
          directory: "./src/database/migrations",
          tableName: "version",
        },
        seeds: {
          directory: "./src/database/seeds",
        },
      },
    },
    server: {
      host: "localhost",
      port: process.env.PORT || "8001",
      graphiql: true,
    },
    logger: {
      debug: "app*",
      console: {
        level: "error",
      },
    },
  },
};
