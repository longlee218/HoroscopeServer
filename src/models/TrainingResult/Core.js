const {Schema, model} = require("ottoman");
require("../../core/Database");

/** Schema phần giải thích */
const horoCoreSchema = new Schema({
    reason: {type: String, require: true},
    result: {type: String, require: true},
    refer: {type: String, require: false},
});

/**
 *  Schema cho thông tin cơ bản sao
 *  */
const horoFiveElSchema = new Schema({
    name: {type: String, require: true},
    slug: {type: String, require: true},
    position: {type: String, require: false},
    five_basic_el: {type: String, require: true},
});

/**
 * Schema cho thông tin các cung trong lá số
 *   */
const horoCungSchema = new Schema({
    name: {type: String, require: true},
    slug: {type: String, require: true},
    has_main_star: Boolean,
    is_body_horoscope: Boolean,
    position: {type: String, require: false},
    fortune: Number,
    main_star: [horoFiveElSchema],
    good_star: [horoFiveElSchema],
    bad_star: [horoFiveElSchema],
    year_destiny: {type: String, require: true},
    circle_life: horoFiveElSchema,
    month_destiny: horoFiveElSchema,
});

/**
 * Schema cho phần render thẻ lá số tử vi
 *
 * */
const horoCardSchema = new Schema({
    destiny: {
        _0: horoCungSchema,
        _1: horoCungSchema,
        _2: horoCungSchema,
        _3: horoCungSchema,
        _4: horoCungSchema,
        _5: horoCungSchema,
        _6: horoCungSchema,
        _7: horoCungSchema,
        _8: horoCungSchema,
        _9: horoCungSchema,
        _10: horoCungSchema,
        _11: horoCungSchema,
        _12: horoCungSchema,
    },
    info: {
        year: horoFiveElSchema,
        month: horoFiveElSchema,
        day: horoFiveElSchema,
        hour: horoFiveElSchema,
        gender: horoFiveElSchema,
        fate: horoFiveElSchema,
        _cuc: horoFiveElSchema,
        _than_cu: horoFiveElSchema,
        _menh_chu: horoFiveElSchema,
        _than_chu: horoFiveElSchema,
        _diem_huyen_khi: horoFiveElSchema,
        _diem_cung_khi: horoFiveElSchema,
        _lai_nhan_cung: horoFiveElSchema,
        _nguyen_than: horoFiveElSchema,
    },
});

/**
 * Schema tổng quát của cả lá số
 * */
const schema = new Schema({
    key: {type: String, require: true},
    title: String,
    description: String,
    alias_tp_gd: {
        type: String,
        enum: ["am_nam", "am_nu", "duong_nam", "duong_nu"],
    },
    alias_yy: String,
    alias_mm: {
        type: Number,
        min: 1,
        max: 12,
    },
    alias_dd: {
        type: Number,
        min: 1,
        max: 31,
    },
    explain: Object,
    horoscope: horoCardSchema,
    create_at: Date,
});

const collectionName = "cores";
const scopeName = "training_results";
const modelName = "result";
module.exports = model(modelName, schema, {collectionName, scopeName});
