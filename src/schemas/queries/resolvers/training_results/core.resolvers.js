const {CoreRepo} = require("../../../../respositories");
const CoreService = require("../../../../services/TrainingResult/CoreService");
const {UserInputError} = require("apollo-server-errors");
const service = new CoreService(CoreRepo);

module.exports = {
    Query: {
        horoscopes: (parent, args) =>
            service.findAll(args.limit, args.offset),
        horoscopeType: (parent, args) =>
            service.findAll(args.limit, args.offset, args.type, args.value),
        horoscopeSolar: (parent, args) =>
            service.findByIdFromSolar(args.gd, args.dd, args.mm, args.yy, args._hh, args.timezone),
        horoscopeLunar: (parent, args) =>
            service.findByIdFromLunar(args.s_tp, args.s_gd, args.s_can, args.s_chi, args.s_hh, args.s_date, args.s_month),
        horoscopeId: (parent, args) =>
            service.findById(args.id),
        horoscopeCard: (parent, args) => {
            const {date, month, year, hour, gender, isSolar, timezone, fullName} = args;
            if (date <= 0 || date > 31) {
                throw new UserInputError("Ngày không hợp lệ", {
                    argumentName: "date"
                });
            }
            if (month <= 0 || month > 12) {
                throw new UserInputError("Tháng không hợp lệ", {
                    argumentName: "month"
                });
            }
            if (year <= 1800) {
                throw new UserInputError("Năm không hợp lệ", {
                    argumentName: "year"
                });
            }
            if (!["ty", "su", "dan", "mao", "thin", "ti", "ngo", "mui", "than", "dau", "tuat", "hoi"].includes(hour)) {
                throw new UserInputError("Giờ không hợp lệ", {
                    argumentName: "hour"
                });
            }
            if (![0, 1].includes(gender)) {
                throw new UserInputError("Giới tính không hợp lệ", {
                    argumentName: "gender"
                });
            }
            return service.getHoroscopeCard(date, month, year, hour, gender, fullName, isSolar, timezone)
        }
    }
}