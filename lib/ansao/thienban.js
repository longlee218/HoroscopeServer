const {
    canChiNgay,
    diaChi,
    ngayThangNam,
    ngayThangNamCanChi,
    nguHanh,
    nguHanhNapAm,
    thienCan,
    timCuc,
    sinhKhac,
} = require("./amduong");
const moment = require("moment");
const { jdFromDate } = require("../calendarVN");
const modulo = require("../modulo");

class lapThienBan {
    constructor(
        nn,
        tt,
        nnnn,
        gioSinh,
        gioiTinh,
        ten,
        diaBan,
        duongLich = true,
        timeZone = 7
    ) {
        this.gioiTinh = parseInt(gioiTinh) === 1 ? 1 : -1;
        this.namNu = parseInt(gioiTinh) ? "Nam" : "Nữ";
        const chiGioSinh = diaChi[gioSinh];
        // let canGioSinh = ((jdFromDate(nn, tt, nnnn) - 1) * 2 % 10 + gioSinh) % 10;
        let canGioSinh = modulo(
            modulo((jdFromDate(nn, tt, nnnn) - 1) * 2, 10) + gioSinh,
            10
        );

        if (canGioSinh === 0) {
            canGioSinh = 10;
        }
        this.chiGioSinh = chiGioSinh;
        this.canGioSinh = canGioSinh;
        this.gioSinh = `${thienCan[canGioSinh]["tenCan"]} ${chiGioSinh["tenChi"]}`;
        this.timeZone = timeZone;
        this.today = moment().format("DD/MM/YYYY");
        this.ngayDuong = nn;
        this.thangDuong = tt;
        this.namDuong = nnnn;
        this.ten = ten;
        if (duongLich) {
            const [a0, b0, c0, d0] = ngayThangNam(
                this.ngayDuong,
                this.thangDuong,
                this.namDuong,
                true,
                this.timeZone
            );
            this.ngayAm = a0;
            this.thangAm = b0;
            this.namAm = c0;
            this.thangNhuan = d0;
        } else {
            this.ngayAm = this.ngayDuong;
            this.thangAm = this.thangDuong;
            this.namAm = this.namDuong;
        }
        const [a1, b1, c1] = ngayThangNamCanChi(
            this.ngayAm,
            this.thangAm,
            this.namAm,
            false,
            this.timeZone
        );
        this.canThang = a1;
        this.canNam = b1;
        this.chiNam = c1;

        this.chiThang = this.thangAm;
        this.canThangTen = thienCan[this.canThang]["tenCan"];
        this.canNamTen = thienCan[this.canNam]["tenCan"];
        this.chiThangTen = diaChi[this.thangAm]["tenChi"];
        this.chiNamTen = diaChi[this.chiNam]["tenChi"];
        const [a2, b2] = canChiNgay(
            this.ngayDuong,
            this.thangDuong,
            this.namDuong,
            duongLich,
            timeZone
        );
        this.canNgay = a2;
        this.chiNgay = b2;
        this.canNgayTen = thienCan[this.canNgay]["tenCan"];
        this.chiNgayTen = diaChi[this.chiNgay]["tenChi"];

        const cungAmDuong = modulo(diaBan.cungMenh, 2) === 1 ? 1 : -1;
        this.amDuongNamSinh = modulo(this.chiNam, 2) === 1 ? "Dương" : "Âm";
        if (cungAmDuong * this.gioiTinh === 1) {
            this.amDuongMenh = "Âm dương thuận lý";
        } else {
            this.amDuongMenh = "Âm dương nghịch lý";
        }
        const cuc = timCuc(diaBan.cungMenh, this.canNam);
        this.hanhCuc = nguHanh(cuc)["id"];
        this.tenCuc = nguHanh(cuc)["tenCuc"];
        this.menhChu = diaChi[this.canNam]["menhChu"];
        this.thanChu = diaChi[this.canNam]["thanChu"];
        this.menh = nguHanhNapAm(this.chiNam, this.canNam);
        const menhId = nguHanh(this.menh)["id"];
        const menhCuc = sinhKhac(menhId, this.hanhCuc);
        // if (menhCuc === 1) {
        //     this.sinhKhac = "Bản Mệnh sinh Cục"
        // } else if (menhCuc === -1) {
        //     this.sinhKhac = "Bản Mệnh khắc Cục"
        // } else if (menhCuc === math.complex(0, -1)) {
        //     this.sinhKhac = "Cục khắc Bản Mệnh"
        // } else if (menhCuc === math.complex(0, 1)) {
        //     this.sinhKhac = "Cục sinh Bản mệnh"
        // } else {
        //     this.sinhKhac = "Cục hòa Bản Mệnh"
        // }
        if (menhCuc === 1) {
            this.sinhKhac = "Bản Mệnh sinh Cục";
        } else if (menhCuc === -1) {
            this.sinhKhac = "Bản Mệnh khắc Cục";
        } else if (menhCuc === -2) {
            this.sinhKhac = "Cục khắc Bản Mệnh";
        } else if (menhCuc === 2) {
            this.sinhKhac = "Cục sinh Bản mệnh";
        } else {
            this.sinhKhac = "Cục hòa Bản Mệnh";
        }

        this.banMenh = nguHanhNapAm(this.chiNam, this.canNam, true);
    }
}

module.exports = lapThienBan;
