const { Logger } = require("../../core/Logger");
const { NotFoundException } = require("../../exceptions");
const {
    calFullSlugFromSolar,
    calFullSlugFromLunar,
} = require("../../../lib/calendarVN");
const { lapThienBan, diaBan, lapDiaBan } = require("../../../lib/ansao");
const moment = require("moment");
const hours = {
    ty: 0,
    suu: 1,
    dan: 3,
    mao: 4,
    thin: 5,
    ti: 6,
    ngo: 7,
    mui: 8,
    than: 9,
    dau: 10,
    tuat: 11,
    hoi: 12,
};

class CoreService {
    log = Logger("app:service:TrainingResult:CoreService");

    constructor(coreRepo) {
        this.coreRepo = coreRepo;
    }

    toId(s_tp, s_gd, s_can, s_chi, s_hh, s_date, s_month) {
        return `${s_date}_${s_month}_${s_can}_${s_chi}_${s_hh}_${s_tp}_${s_gd}`;
    }

    async findAll(limit, offset, type, value) {
        this.log.debug("findAll");
        const results = await this.coreRepo.findAll(limit, offset, type, value);
        return results.map((result) => {
            result.create_at = moment(result.create_at).format(
                "DD/MM/YYYY, hh:mm:ss"
            );
            return result;
        });
    }

    async findById(id) {
        this.log.debug("findById call:");
        const results = await this.coreRepo.findById(id);
        if (results === null) {
            throw new NotFoundException(id);
        }
        return results;
    }

    async findByIdFromSolar(gd, dd, mm, yy, _hh, timezone) {
        const { s_tp, s_gd, s_can, s_chi, s_hh, s_date, s_month } =
            calFullSlugFromSolar(gd, dd, mm, yy, _hh, timezone);
        const id = this.toId(s_tp, s_gd, s_can, s_chi, s_hh, s_date, s_month);
        return this.findById(id);
    }

    async findByIdFromLunar(gd, _dd, _mm, _can, _chi, _hh) {
        const { s_tp, s_gd, s_can, s_chi, s_hh, s_date, s_month } =
            calFullSlugFromLunar(gd, _dd, _mm, _can, _chi, _hh);
        const id = this.toId(s_tp, s_gd, s_can, s_chi, s_hh, s_date, s_month);
        return this.findById(id);
    }

    getHoroscopeCard(
        date,
        month,
        year,
        hour,
        gender,
        fullName,
        isSolar = true,
        timezone = 7
    ) {
        const _diaBan = lapDiaBan(
            diaBan,
            date,
            month,
            year,
            hours[hour],
            gender,
            isSolar,
            timezone
        );
        const _thienBan = new lapThienBan(
            date,
            month,
            year,
            hours[hour],
            gender,
            fullName,
            _diaBan
        );
        return {
            thien_ban: _thienBan,
            thap_nhi_cung: _diaBan.thapNhiCung,
        };
    }
}

const a = new CoreService();
const b = a.getHoroscopeCard(21, 8, 1999, "mui", 1);
console.log(b.thap_nhi_cung[1]);

module.exports = CoreService;
