require("dotenv").config();
const {Logger} = require("./Logger");
const Environment = require("./Environment");
const {Ottoman} = require("ottoman");
const {bucket, connection} = Environment.getConfig().database.couchbase;

const log = Logger("app:core:database");

log.debug(`Connecting to couchbase ${connection}, bucket: ${bucket}`);

const ottoman = new Ottoman();
const options = {
    connectionString: connection,
    bucketName: bucket,
    username: process.env.USERNAME_COUCHBASE || "Administrator",
    password: process.env.PASSWORD_COUCHBASE || "akb1564ltt",
};

exports.connect = async () => {
    await ottoman.connect(options);
    await ottoman.start();
    return ottoman;
};

exports.close = async () => {
    await ottoman.close();
}

exports.ottoman = ottoman;

