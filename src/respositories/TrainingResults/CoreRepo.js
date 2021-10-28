const AbstractRepo = require("../AbstractRepo");
const {Core} = require("../../models/");
const {Query} = require("ottoman");
const namespace = "horoscope.training_results.cores";

module.exports = class CoreRepo extends AbstractRepo {
    static async create(data) {
        await this.openConnect();
        try {
            const result = await Core.create(data);
            await this.closeConnect();
            return result;
        } catch (e) {
            return null;
        }
    }

    static async createMany(arrData) {
        await this.openConnect();
        const res = await Core.createMany(arrData);
        await this.closeConnect();
        return res;
    }

    static async findById(id) {
        await this.openConnect();
        const res = await Core.findById(id);
        await this.closeConnect();
        return res;
    }

    static async findAll(limit = 10, offset = 1, type = null, value = null) {
        const ottoman = await this.openConnect();
        let where = [
            {title: {$isNotNull: true}},
            {description: {$isNotNull: true}}
        ]
        if (type !== null && value !== null) {
            switch (type) {
                case "gd":
                    where.push({alias_tp_gd: {$eq: value, $ignoreCase: true}})
                    break;
                case "dd":
                    where.push({alias_dd: {$eq: parseInt(value)}});
                    break;
                case "mm":
                    where.push({alias_mm: {$eq: parseInt(value)}});
                    break;
                case "yy":
                    where.push({alias_yy: {$eq: value, $ignoreCase: true}});
                    break;
                case "hh":
                    where.push({alias_hh: {$eq: value, $ignoreCase: true}});
                    break;
                default:
                    where.push({alias_yy: {$eq: value, $ignoreCase: true}});
                    break;
            }
        }
        const params = {
            select: [
                {$field: "id,title,description,alias_yy,alias_hh,alias_dd,alias_mm,create_at"}
            ],
            where: {
                $and: where
            },
            orderBy: {id: "ASC"},
            limit: limit > 20 ? 10 : limit,
            offset: offset,
        }
        const query = new Query(params, namespace).build();
        const {rows} = await ottoman.query(query);
        await this.closeConnect();
        return rows;
    }
}

