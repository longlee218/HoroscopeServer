const Database = require("../core/Database");
module.exports = class AbstractRepo {
    static model = null;

    static async openConnect() {
        return await Database.connect();
    }

    static async closeConnect() {
        await Database.close();
    }
};
