const { nguHanh } = require("./amduong");

/**
 * @description  1: Chính tinh
 * @description  2: Phụ tinh nói chung
 * @description  3: Quý tinh
 * @description  4: Quyền tinh
 * @description  5: Phúc tinh
 * @description  6: Văn tinh
 * @description  7: Đài các tinh
 * @description  8: Đào hoa tinh
 * @description  11: Sát tinh
 * @description  12: Bại tinh
 * @description  13: Ám tinh
 * @description  14: Dâm tinh
 * @description  15: Hình tinh
 * @property:  saoPhuongVi (str, optional): Bắc Đẩu tinh, Nam Bắc Đẩu tinh
 * @property:  saoAmDuong (str, optional): Âm Dương của sao
 * @property:  vongTrangSinh (int, optional): 0/None: Không thuộc vòng Tràng sinh 1: Thuộc vòng Tràng sinh
 * @property:  saoID (int): 1, 2
 * @property:  saoTen (TYPE): Tử vi, Tham lang
 * @property:  saoNguHanh (TYPE): K, M, T, H, O
 * @property:  saoLoai (str, optional): Sao tốt < 10, sau xấu > 10
 * */
class Sao {
    constructor(saoID, saoTen, saoNguHanh, saoLoai = 2, saoPhuongVi = "",
        saoAmDuong = "", vongTrangSinh = 0) {
        this.saoID = saoID
        this.saoTen = saoTen
        this.saoNguHanh = saoNguHanh
        this.saoLoai = saoLoai
        this.saoPhuongVi = saoPhuongVi
        this.saoAmDuong = saoAmDuong
        this.vongTrangSinh = vongTrangSinh
        this.cssSao = nguHanh(saoNguHanh)['css']
        this.saoDacTinh = null
    }

    /**
     * @description An Đặc tính cho sao: V, M, Đ, B, H
     * @param: saoDacTinh (str): Đặc tính của sao, Vượng (V), Miếu (M), Đắc (Đ), Bình (B), Hãm (H)
     * @return: object: self
     * */
    anDacTinh(dacTinh) {
        const dt = {
            "V": "vuongDia",
            "M": "mieuDia",
            "Đ": "dacDia",
            "B": "binhHoa",
            "H": "hamDia",
        }
        // self.saoTen += " (%s)" % dacTinh
        self.cssSao = dt[dacTinh]
        this.saoDacTinh = dacTinh;
        return this
    }

    anCung(saoViTriCung) {
        this.saoViTriCung = saoViTriCung
        return this
    }
}

const sao = {};

// Tử vi tinh hệ
sao.saoTuVi = new Sao(1, "Tử vi", "O", 1, "Đế tinh", 1, 0)
sao.saoLiemTrinh = new Sao(2, "Liêm trinh", "H", 1, "Bắc đẩu tinh", 1, 0)
sao.saoThienDong = new Sao(3, "Thiên đồng", "T", 1, "Bắc đẩu tinh", 1, 0)
sao.saoVuKhuc = new Sao(4, "Vũ khúc", "K", 1, "Bắc đẩu tinh", -1, 0)
sao.saoThaiDuong = new Sao(5, "Thái Dương", "H", 1, "Nam đẩu tinh", 1, 0)
sao.saoThienCo = new Sao(6, "Thiên cơ", "M", 1, "Nam đẩu tinh", -1, 0)

// Thiên phủ tinh hệ
sao.saoThienPhu = new Sao(7, "Thiên phủ", "O", 1, "Nam đẩu tinh", 1, 0)
sao.saoThaiAm = new Sao(8, "Thái âm", "T", 1, "Bắc đẩu tinh", -1, 0)
sao.saoThamLang = new Sao(9, "Tham lang", "T", 1, "Bắc đẩu tinh", -1, 0)
sao.saoCuMon = new Sao(10, "Cự môn", "T", 1, "Bắc đẩu tinh", -1, 0)
sao.saoThienTuong = new Sao(11, "Thiên tướng", "T", 1, "Nam đẩu tinh", 1, 0)
sao.saoThienLuong = new Sao(12, "Thiên lương", "M", 1, "Nam đẩu tinh", -1, 0)
sao.saoThatSat = new Sao(13, "Thất sát", "K", 1, "Nam đẩu tinh", 1, 0)
sao.saoPhaQuan = new Sao(14, "Phá quân", "T", 1, "Bắc đẩu tinh", -1, 0)

// Vòng Địa chi - Thái tuế
sao.saoThaiTue = new Sao(15, "Thái tuế", "H", 15, "", 0)
sao.saoThieuDuong = new Sao(16, "Thiếu dương", "H", 5)
sao.saoTangMon = new Sao(17, "Tang môn", "M", 12)
sao.saoThieuAm = new Sao(18, "Thiếu âm", "T", 5)
sao.saoQuanPhu3 = new Sao(19, "Quan phù", "H", 12)
sao.saoTuPhu = new Sao(20, "Tử phù", "K", 12)
sao.saoTuePha = new Sao(21, "Tuế phá", "H", 12)
sao.saoLongDuc = new Sao(22, "Long đức", "T", 5)
sao.saoBachHo = new Sao(23, "Bạch hổ", "K", 12)
sao.saoPhucDuc = new Sao(24, "Phúc đức", "O", 5)
sao.saoDieuKhach = new Sao(25, "Điếu khách", "H", 12)
sao.saoTrucPhu = new Sao(26, "Trực phù", "K", 16)

//  Vòng Thiên can - Lộc tồn
sao.saoLocTon = new Sao(27, "Lộc tồn", "O", 3, "Bắc đẩu tinh")
sao.saoBacSy = new Sao(109, "Bác sỹ", "T", 5,)
sao.saoLucSi = new Sao(28, "Lực sĩ", "H", 2)
sao.saoThanhLong = new Sao(29, "Thanh long", "T", 5)
sao.saoTieuHao = new Sao(30, "Tiểu hao", "H", 12)
sao.saoTuongQuan = new Sao(31, "Tướng quân", "M", 4)
sao.saoTauThu = new Sao(32, "Tấu thư", "K", 3)
sao.saoPhiLiem = new Sao(33, "Phi liêm", "H", 2)
sao.saoHyThan = new Sao(34, "Hỷ thần", "H", 5)
sao.saoBenhPhu = new Sao(35, "Bệnh phù", "O", 12)
sao.saoDaiHao = new Sao(36, "Đại hao", "H", 12)
sao.saoPhucBinh = new Sao(37, "Phục binh", "H", 13)
sao.saoQuanPhu2 = new Sao(38, "Quan phù", "H", 12)

// Vòng Tràng sinh
sao.saoTrangSinh = new Sao(39, "Tràng sinh", "T", 5, "", "", 1)
sao.saoMocDuc = new Sao(40, "Mộc dục", "T", 14, "", "", 1)
sao.saoQuanDoi = new Sao(41, "Quan đới", "K", 4, "", "", 1)
sao.saoLamQuan = new Sao(42, "Lâm quan", "K", 7, "", "", 1)
sao.saoDeVuong = new Sao(43, "Đế vượng", "K", 5, "", "", 1)
sao.saoSuy = new Sao(44, "Suy", "T", 12, "", "", 1)
sao.saoBenh = new Sao(45, "Bệnh", "H", 12, "", "", 1)
sao.saoTu = new Sao(46, "Tử", "H", 12, "", "", 1)
sao.saoMo = new Sao(47, "Mộ", "O", "", "", 1)
sao.saoTuyet = new Sao(48, "Tuyệt", "O", 12, "", "", 1)
sao.saoThai = new Sao(49, "Thai", "O", 14, "", "", 1)
sao.saoDuong = new Sao(50, "Dưỡng", "M", 2, "", "", 1)

// Lụcsát
// Kình dương đà la
sao.saoDaLa = new Sao(51, "Đà la", "K", 11)
sao.saoKinhDuong = new Sao(52, "Kình dương", "K", 11)

// Địa không - Địa kiếp
sao.saoDiaKhong = new Sao(53, "Địa không", "H", 11)
sao.saoDiaKiep = new Sao(54, "Địa kiếp", "H", 11)

// Hỏa tinh - Linh tinh
sao.saoLinhTinh = new Sao(55, "Linh tinh", "H", 11)
sao.saoHoaTinh = new Sao(56, "Hỏa tinh", "H", 11)

// Sao Âm Dương
// Văn xương - Văn khúc
sao.saoVanXuong = new Sao(57, "Văn xương", "K", 6)
sao.saoVanKhuc = new Sao(58, "Văn Khúc", "T", 6)

// Thiên khôi - Thiên Việt
sao.saoThienKhoi = new Sao(59, "Thiên khôi", "H", 6)
sao.saoThienViet = new Sao(60, "Thiên việt", "H", 6)

// Tả phù - Hữu bật
sao.saoTaPhu = new Sao(61, "Tả phù", "O", 2)
sao.saoHuuBat = new Sao(62, "Hữu bật", "O", 2)

// Long trì - Phượng các
sao.saoLongTri = new Sao(63, "Long trì", "T", 3)
sao.saoPhuongCac = new Sao(64, "Phượng các", "O", 3)

// Tam thai - Bát tọa
sao.saoTamThai = new Sao(65, "Tam thai", "M", 7)
sao.saoBatToa = new Sao(66, "Bát tọa", "T", 7)

// Ân quang - Thiên quý
sao.saoAnQuang = new Sao(67, "Ân quang", "M", 3)
sao.saoThienQuy = new Sao(68, "Thiên quý", "O", 3)

// Sao đôi khác
sao.saoThienKhoc = new Sao(69, "Thiên khốc", "T", 12)
sao.saoThienHu = new Sao(70, "Thiên hư", "T", 12)
sao.saoThienDuc = new Sao(71, "Thiên đức", "H", 5)
sao.saoNguyetDuc = new Sao(72, "Nguyệt đức", "H", 5)
sao.saoThienHinh = new Sao(73, "Thiên hình", "H", 15)
sao.saoThienRieu = new Sao(74, "Thiên riêu", "T", 13)
sao.saoThienY = new Sao(75, "Thiên y", "T", 5)
sao.saoQuocAn = new Sao(76, "Quốc ấn", "O", 6)
sao.saoDuongPhu = new Sao(77, "Đường phù", "M", 4)
sao.saoDaoHoa = new Sao(78, "Đào hoa", "M", 8)
sao.saoHongLoan = new Sao(79, "Hồng loan", "T", 8)
sao.saoThienHy = new Sao(80, "Thiên hỷ", "T", 5)
sao.saoThienGiai = new Sao(81, "Thiên giải", "H", 5)
sao.saoDiaGiai = new Sao(82, "Địa giải", "O", 5)
sao.saoGiaiThan = new Sao(83, "Giải thần", "M", 5)
sao.saoThaiPhu = new Sao(84, "Thai phụ", "K", 6)
sao.saoPhongCao = new Sao(85, "Phong cáo", "O", 4)
sao.saoThienTai = new Sao(86, "Thiên tài", "O", 2)
sao.saoThienTho = new Sao(87, "Thiên thọ", "O", 5)
sao.saoThienThuong = new Sao(88, "Thiên thương", "O", 12)
sao.saoThienSu = new Sao(89, "Thiên sứ", "T", 12)
sao.saoThienLa = new Sao(90, "Thiên la", "O", 12)
sao.saoDiaVong = new Sao(91, "Địa võng", "O", 12)
sao.saoHoaKhoa = new Sao(92, "Hóa khoa", "T", 5)
sao.saoHoaQuyen = new Sao(93, "Hóa quyền", "T", 4)
sao.saoHoaLoc = new Sao(94, "Hóa lộc", "M", 3)
sao.saoHoaKy = new Sao(95, "Hóa kỵ", "T", 13)
sao.saoCoThan = new Sao(96, "Cô thần", "O", 13)
sao.saoQuaTu = new Sao(97, "Quả tú", "O", 13)
sao.saoThienMa = new Sao(98, "Thiên mã", "H", 3)
sao.saoPhaToai = new Sao(99, "Phá toái", "H", 12)
sao.saoThienQuan = new Sao(100, "Thiên quan", "H", 5)
sao.saoThienPhuc = new Sao(101, "Thiên phúc", "H", 5)
sao.saoLuuHa = new Sao(102, "Lưu hà", "T", 12)
sao.saoThienTru = new Sao(103, "Thiên trù", "O", 5)
sao.saoKiepSat = new Sao(104, "Kiếp sát", "H", 11)
sao.saoHoaCai = new Sao(105, "Hoa cái", "K", 14)
sao.saoVanTinh = new Sao(106, "Văn tinh", "H", 6)
sao.saoDauQuan = new Sao(107, "Đẩu quân", "H", 5)
sao.saoThienKhong = new Sao(108, "Thiên không", "T", 11)

module.exports = sao;