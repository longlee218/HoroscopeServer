const {
    dichCung, ngayThangNam, ngayThangNamCanChi, nguHanh,
    nguHanhNapAm, thienCan, timCoThan, timCuc, timHoaLinh,
    timLuuTru, timPhaToai, timThienKhoi, timThienMa,
    timThienQuanThienPhuc, timTrangSinh, timTriet, timTuVi,
    diaChi
} = require("./amduong");

const {
    saoAnQuang, saoBachHo, saoBacSy, saoBatToa, saoBenh,
    saoBenhPhu, saoCoThan, saoCuMon, saoDaiHao, saoDaLa,
    saoDaoHoa, saoDauQuan, saoDeVuong, saoDiaGiai, saoDiaKhong,
    saoDiaKiep, saoDiaVong, saoDieuKhach, saoDuong, saoDuongPhu,
    saoGiaiThan, saoHoaCai, saoHoaKhoa, saoHoaKy, saoHoaLoc,
    saoHoaQuyen, saoHoaTinh, saoHongLoan, saoHuuBat, saoHyThan,
    saoKiepSat, saoKinhDuong, saoLamQuan, saoLiemTrinh,
    saoLinhTinh, saoLocTon, saoLongDuc, saoLongTri, saoLucSi,
    saoLuuHa, saoMo, saoMocDuc, saoNguyetDuc, saoPhaQuan,
    saoPhaToai, saoPhiLiem, saoPhongCao, saoPhucBinh, saoPhucDuc,
    saoPhuongCac, saoQuanDoi, saoQuanPhu2, saoQuanPhu3, saoQuaTu,
    saoQuocAn, saoSuy, saoTamThai, saoTangMon, saoTaPhu,
    saoTauThu, saoThai, saoThaiAm, saoThaiDuong, saoThaiPhu,
    saoThaiTue, saoThamLang, saoThanhLong, saoThatSat, saoThienCo,
    saoThienDong, saoThienDuc, saoThienGiai, saoThienHinh,
    saoThienHu, saoThienHy, saoThienKhoc, saoThienKhoi,
    saoThienKhong, saoThienLa, saoThienLuong, saoThienMa,
    saoThienPhu, saoThienPhuc, saoThienQuan, saoThienQuy,
    saoThienRieu, saoThienSu, saoThienTai, saoThienTho,
    saoThienThuong, saoThienTru, saoThienTuong, saoThienViet,
    saoThienY, saoThieuAm, saoThieuDuong, saoTieuHao,
    saoTrangSinh, saoTrucPhu, saoTu, saoTuePha, saoTuongQuan,
    saoTuPhu, saoTuVi, saoTuyet, saoVanKhuc, saoVanTinh,
    saoVanXuong, saoVuKhuc
} = require("./sao");

const lapDiaBan = (diaBan, nn, tt, nnnn, gioSinh, gioiTinh, duongLich, timeZone) => {
    if (duongLich) {
        [nn, tt, nnnn, thangNhuan] = ngayThangNam(nn, tt, nnnn, duongLich, timeZone);
    }
    const [canThang, canNam, chiNam] = ngayThangNamCanChi(nn, tt, nnnn, false, timeZone);
    diaBan = new diaBan(tt, gioSinh);

    const amDuongNamSinh = thienCan[canNam]["amDuong"];
    const amDuongChiNamSinh = diaChi[chiNam]["amDuong"];

    // B???n M???nh ch??nh l?? Ng?? h??nh n???p ??m c???a n??m sinh
    // banMenh = nguHanhNapAm(canNam, chiNam)

    const hanhCuc = timCuc(diaBan.cungMenh, canNam);
    const cuc = nguHanh(hanhCuc);
    const cucSo = cuc['cuc'];

    // Nh???p ?????i h???n khi ???? bi???t ???????c s??? c???c
    // Theo s??ch S??? t??? vi d?????i g??c nh??n khoa h???c
    // D????ng Nam - ??m N??? theo chi???u thu???n
    // ??m Nam - D????ng N??? theo chi???u ngh???ch

    diaBan = diaBan.nhapDaiHan(cucSo, gioiTinh * amDuongChiNamSinh)

    // Nh???p ti???u h???n
    const khoiHan = dichCung(11, -3 * (chiNam - 1))
    diaBan = diaBan.nhapTieuHan(khoiHan, gioiTinh, chiNam)

    // B???t ?????u an T??? vi tinh h???
    const viTriTuVi = timTuVi(cucSo, nn)
    diaBan.nhapSao(viTriTuVi, saoTuVi)

    const viTriLiemTrinh = dichCung(viTriTuVi, 4)
    diaBan.nhapSao(viTriLiemTrinh, saoLiemTrinh)

    const viTriThienDong = dichCung(viTriTuVi, 7)
    diaBan.nhapSao(viTriThienDong, saoThienDong)

    const viTriVuKhuc = dichCung(viTriTuVi, 8)
    diaBan.nhapSao(viTriVuKhuc, saoVuKhuc)

    const vitriThaiDuong = dichCung(viTriTuVi, 9)
    diaBan.nhapSao(vitriThaiDuong, saoThaiDuong)

    const viTriThienCo = dichCung(viTriTuVi, 11)
    diaBan.nhapSao(viTriThienCo, saoThienCo)

    // Thi??n ph??? tinh h???
    // viTriTuVi = 4
    const viTriThienPhu = dichCung(3, 3 - viTriTuVi)
    diaBan.nhapSao(viTriThienPhu, saoThienPhu)

    const viTriThaiAm = dichCung(viTriThienPhu, 1)
    diaBan.nhapSao(viTriThaiAm, saoThaiAm)

    const viTriThamLang = dichCung(viTriThienPhu, 2)
    diaBan.nhapSao(viTriThamLang, saoThamLang)

    const viTriCuMon = dichCung(viTriThienPhu, 3)
    diaBan.nhapSao(viTriCuMon, saoCuMon)

    const viTriThienTuong = dichCung(viTriThienPhu, 4)
    diaBan.nhapSao(viTriThienTuong, saoThienTuong)

    const viTriThienLuong = dichCung(viTriThienPhu, 5)
    diaBan.nhapSao(viTriThienLuong, saoThienLuong)

    const viTriThatSat = dichCung(viTriThienPhu, 6)
    diaBan.nhapSao(viTriThatSat, saoThatSat)

    const viTriPhaQuan = dichCung(viTriThienPhu, 10)
    diaBan.nhapSao(viTriPhaQuan, saoPhaQuan)

    // V??ng L???c t???n
    // V??? tr?? sao L???c t???n ??? Can c???a n??m sinh tr??n ?????a b??n
    //  sao B??c s??? ??? c??ng cung v???i L???c t???n
    const viTriLocTon = thienCan[canNam]['vitriDiaBan']
    diaBan.nhapSao(viTriLocTon, saoLocTon, saoBacSy)

    const amDuongNamNu = gioiTinh * amDuongNamSinh
    const viTriLucSi = dichCung(viTriLocTon, amDuongNamNu)
    diaBan.nhapSao(viTriLucSi, saoLucSi)

    const viTriThanhLong = dichCung(viTriLocTon, 2 * amDuongNamNu)
    diaBan.nhapSao(viTriThanhLong, saoThanhLong)

    const viTriTieuHao = dichCung(viTriLocTon, 3 * amDuongNamNu)
    diaBan.nhapSao(viTriTieuHao, saoTieuHao)

    const viTriTuongQuan = dichCung(viTriLocTon, 4 * amDuongNamNu)
    diaBan.nhapSao(viTriTuongQuan, saoTuongQuan)

    const viTriTauThu = dichCung(viTriLocTon, 5 * amDuongNamNu)
    diaBan.nhapSao(viTriTauThu, saoTauThu)

    const viTriPhiLiem = dichCung(viTriLocTon, 6 * amDuongNamNu)
    diaBan.nhapSao(viTriPhiLiem, saoPhiLiem)

    const viTriHyThan = dichCung(viTriLocTon, 7 * amDuongNamNu)
    diaBan.nhapSao(viTriHyThan, saoHyThan)

    const viTriBenhPhu = dichCung(viTriLocTon, 8 * amDuongNamNu)
    diaBan.nhapSao(viTriBenhPhu, saoBenhPhu)

    const viTriDaiHao = dichCung(viTriLocTon, 9 * amDuongNamNu)
    diaBan.nhapSao(viTriDaiHao, saoDaiHao)

    const viTriPhucBinh = dichCung(viTriLocTon, 10 * amDuongNamNu)
    diaBan.nhapSao(viTriPhucBinh, saoPhucBinh)

    const viTriQuanPhu2 = dichCung(viTriLocTon, 11 * amDuongNamNu)
    diaBan.nhapSao(viTriQuanPhu2, saoQuanPhu2)

    // V??ng ?????a chi - Th??i tu???
    const viTriThaiTue = chiNam
    diaBan.nhapSao(viTriThaiTue, saoThaiTue)

    const viTriThieuDuong = dichCung(viTriThaiTue, 1)
    diaBan.nhapSao(viTriThieuDuong, saoThieuDuong, saoThienKhong)

    const viTriTangMon = dichCung(viTriThaiTue, 2)
    diaBan.nhapSao(viTriTangMon, saoTangMon)

    const viTriThieuAm = dichCung(viTriThaiTue, 3)
    diaBan.nhapSao(viTriThieuAm, saoThieuAm)

    const viTriQuanPhu3 = dichCung(viTriThaiTue, 4)
    diaBan.nhapSao(viTriQuanPhu3, saoQuanPhu3)

    const viTriTuPhu = dichCung(viTriThaiTue, 5)
    diaBan.nhapSao(viTriTuPhu, saoTuPhu, saoNguyetDuc)

    const viTriTuePha = dichCung(viTriThaiTue, 6)
    diaBan.nhapSao(viTriTuePha, saoTuePha)

    const viTriLongDuc = dichCung(viTriThaiTue, 7)
    diaBan.nhapSao(viTriLongDuc, saoLongDuc)

    const viTriBachHo = dichCung(viTriThaiTue, 8)
    diaBan.nhapSao(viTriBachHo, saoBachHo)

    const viTriPhucDuc = dichCung(viTriThaiTue, 9)
    diaBan.nhapSao(viTriPhucDuc, saoPhucDuc, saoThienDuc)

    const viTriDieuKhach = dichCung(viTriThaiTue, 10)
    diaBan.nhapSao(viTriDieuKhach, saoDieuKhach)

    const viTriTrucPhu = dichCung(viTriThaiTue, 11)
    diaBan.nhapSao(viTriTrucPhu, saoTrucPhu)

    //  V??ng ng?? h??nh c???c Tr??ng sinh
    // !!! ???? s???a !!! *L??U ?? Ph???n n??y ???? s???a* Theo c??? Thi??n L????ng: Nam -> Thu???n,
    // N??? -> Ngh???ch (Kh??ng ph?? h???p)
    // **ISSUE 2**: D????ng nam, ??m n??? theo chi???u thu???n, ??m nam D????ng n??? theo
    // chi???u ngh???ch

    const viTriTrangSinh = timTrangSinh(cucSo)
    diaBan.nhapSao(viTriTrangSinh, saoTrangSinh)

    const viTriMocDuc = dichCung(viTriTrangSinh, amDuongNamNu * 1)
    diaBan.nhapSao(viTriMocDuc, saoMocDuc)

    const viTriQuanDoi = dichCung(viTriTrangSinh, amDuongNamNu * 2)
    diaBan.nhapSao(viTriQuanDoi, saoQuanDoi)

    const viTriLamQuan = dichCung(viTriTrangSinh, amDuongNamNu * 3)
    diaBan.nhapSao(viTriLamQuan, saoLamQuan)

    const viTriDeVuong = dichCung(viTriTrangSinh, amDuongNamNu * 4)
    diaBan.nhapSao(viTriDeVuong, saoDeVuong)

    const viTriSuy = dichCung(viTriTrangSinh, amDuongNamNu * 5)
    diaBan.nhapSao(viTriSuy, saoSuy)

    const viTriBenh = dichCung(viTriTrangSinh, amDuongNamNu * 6)
    diaBan.nhapSao(viTriBenh, saoBenh)

    const viTriTu = dichCung(viTriTrangSinh, amDuongNamNu * 7)
    diaBan.nhapSao(viTriTu, saoTu)

    const viTriMo = dichCung(viTriTrangSinh, amDuongNamNu * 8)
    diaBan.nhapSao(viTriMo, saoMo)

    const viTriTuyet = dichCung(viTriTrangSinh, amDuongNamNu * 9)
    diaBan.nhapSao(viTriTuyet, saoTuyet)

    const viTriThai = dichCung(viTriTrangSinh, amDuongNamNu * (-1))
    diaBan.nhapSao(viTriThai, saoThai)

    const viTriDuong = dichCung(viTriTrangSinh, amDuongNamNu * (-2))
    diaBan.nhapSao(viTriDuong, saoDuong)

    // An sao ????i
    // K??nh d????ng - ???? la
    const viTriDaLa = dichCung(viTriLocTon, -1)
    diaBan.nhapSao(viTriDaLa, saoDaLa)

    const viTriKinhDuong = dichCung(viTriLocTon, 1)
    diaBan.nhapSao(viTriKinhDuong, saoKinhDuong)

    //  Kh??ng - Ki???p
    //  Kh???i gi??? T?? ??? cung H???i, ?????m thu???n ?????n gi??? sinh ???????c cung ?????a ki???p
    const viTriDiaKiep = dichCung(11, gioSinh)
    diaBan.nhapSao(viTriDiaKiep, saoDiaKiep)

    const viTriDiaKhong = dichCung(12, 12 - viTriDiaKiep)
    diaBan.nhapSao(viTriDiaKhong, saoDiaKhong)

    const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(chiNam, gioSinh, gioiTinh, amDuongNamSinh)
    diaBan.nhapSao(viTriHoaTinh, saoHoaTinh)
    diaBan.nhapSao(viTriLinhTinh, saoLinhTinh)

    const viTriLongTri = dichCung(5, chiNam - 1)
    diaBan.nhapSao(viTriLongTri, saoLongTri)

    const viTriPhuongCac = dichCung(2, 2 - viTriLongTri)
    diaBan.nhapSao(viTriPhuongCac, saoPhuongCac, saoGiaiThan)

    const viTriTaPhu = dichCung(5, tt - 1)
    diaBan.nhapSao(viTriTaPhu, saoTaPhu)

    const viTriHuuBat = dichCung(2, 2 - viTriTaPhu)
    diaBan.nhapSao(viTriHuuBat, saoHuuBat)

    const viTriVanKhuc = dichCung(5, gioSinh - 1)
    diaBan.nhapSao(viTriVanKhuc, saoVanKhuc)

    const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc)
    diaBan.nhapSao(viTriVanXuong, saoVanXuong)

    const viTriTamThai = dichCung(5, tt + nn - 2)
    diaBan.nhapSao(viTriTamThai, saoTamThai)

    const viTriBatToa = dichCung(2, 2 - viTriTamThai)
    diaBan.nhapSao(viTriBatToa, saoBatToa)

    // ! V??? tr?? sao ??n Quang - Thi??n Qu??
    // ! L???y cung th??n l??m m???ng 1 ?????m thu???n ?????n ng??y sinh,
    // ! lui l???i m???t cung ????? l???y ???? l??m gi??? t?? ?????m thu???n ?????n gi??? sinh l??
    //  ??n Quang
    // ! Thi??n Qu?? ?????i v???i ??n Quang qua tr???c S???u M??i
    // @ viTriAnQuang = dichCung(5, nn + gioSinh - 3)
    // @ viTriThienQuy = dichCung(2, 2 - viTriAnQuang)
    // Ph??a tr??n l?? c??ch an Quang-Qu?? theo c??? Vu Thi??n
    // Sau khi t??m hi???u th?? Quang-Qu?? s??? ???????c an theo X????ng-Kh??c nh?? sau:
    // ??n Quang ??? Xem V??n X????ng ??? cung n??o, k??? cung ???y l?? m???ng m???t
    // b???t ?????u ?????m thoe chi???u thu???n ?????n ng??y sinh, l??i l???i m???t cung,
    // an ??n Quang.
    // Thi??n Qu?? ??? Xem V??n Kh??c ??? cung n??o, k??? cung ???y l?? m???ng m???t,
    // !!! b???t ?????u ?????m theo chi???u ngh???ch ?????n ng??y sinh, l??i l???i m???t cung,
    // an Thi??n Qu??.!!!
    // ??? Thi??n Qu?? ??? ?????i cung c???a ??n Quang qua tr???c S???u M??i m???i ch??nh x??c???

    const viTriAnQuang = dichCung(viTriVanXuong, nn - 2)
    diaBan.nhapSao(viTriAnQuang, saoAnQuang)

    const viTriThienQuy = dichCung(2, 2 - viTriAnQuang)
    diaBan.nhapSao(viTriThienQuy, saoThienQuy)

    const viTriThienKhoi = timThienKhoi(canNam)
    diaBan.nhapSao(viTriThienKhoi, saoThienKhoi)

    const viTriThienViet = dichCung(5, 5 - viTriThienKhoi)
    diaBan.nhapSao(viTriThienViet, saoThienViet)

    const viTriThienHu = dichCung(7, chiNam - 1)
    diaBan.nhapSao(viTriThienHu, saoThienHu)

    const viTriThienKhoc = dichCung(7, -chiNam + 1)
    diaBan.nhapSao(viTriThienKhoc, saoThienKhoc)

    const viTriThienTai = dichCung(diaBan.cungMenh, chiNam - 1)
    diaBan.nhapSao(viTriThienTai, saoThienTai)

    const viTriThienTho = dichCung(diaBan.cungThan, chiNam - 1)
    diaBan.nhapSao(viTriThienTho, saoThienTho)

    const viTriHongLoan = dichCung(4, -chiNam + 1)
    diaBan.nhapSao(viTriHongLoan, saoHongLoan)

    const viTriThienHy = dichCung(viTriHongLoan, 6)
    diaBan.nhapSao(viTriThienHy, saoThienHy)

    //  Thi??n Quan - Thi??n Ph??c
    const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canNam)
    diaBan.nhapSao(viTriThienQuan, saoThienQuan)
    diaBan.nhapSao(viTriThienPhuc, saoThienPhuc)

    const viTriThienHinh = dichCung(10, tt - 1)
    diaBan.nhapSao(viTriThienHinh, saoThienHinh)

    const viTriThienRieu = dichCung(viTriThienHinh, 4)
    diaBan.nhapSao(viTriThienRieu, saoThienRieu, saoThienY)

    const viTriCoThan = timCoThan(chiNam)
    diaBan.nhapSao(viTriCoThan, saoCoThan)

    const viTriQuaTu = dichCung(viTriCoThan, -4)
    diaBan.nhapSao(viTriQuaTu, saoQuaTu)

    const viTriVanTinh = dichCung(viTriKinhDuong, 2)
    diaBan.nhapSao(viTriVanTinh, saoVanTinh)

    const viTriDuongPhu = dichCung(viTriVanTinh, 2)
    diaBan.nhapSao(viTriDuongPhu, saoDuongPhu)

    const viTriQuocAn = dichCung(viTriDuongPhu, 3)
    diaBan.nhapSao(viTriQuocAn, saoQuocAn)

    // Thai ph??? - Phong C??o
    const viTriThaiPhu = dichCung(viTriVanKhuc, 2)
    diaBan.nhapSao(viTriThaiPhu, saoThaiPhu)

    const viTriPhongCao = dichCung(viTriVanKhuc, -2)
    diaBan.nhapSao(viTriPhongCao, saoPhongCao)

    // Thi??n gi???i - ?????a gi???i
    //    Theo c??? Thi??n L????ng: L???y cung Th??n l??m th??ng Gi??ng, ?????m thu???n nh??ng
    //    nh???y cung l?? Thi??n gi???i. M???t s??? trang web ?????m nh??ng kh??ng nh???y cung???
    //    Li???u ph????ng c??ch n??o ????ng?
    const viTriThienGiai = dichCung(9, (2 * tt) - 2)
    diaBan.nhapSao(viTriThienGiai, saoThienGiai)

    const viTriDiaGiai = dichCung(viTriTaPhu, 3)
    diaBan.nhapSao(viTriDiaGiai, saoDiaGiai)

    // Thi??n la - ?????a v??ng, Thi??n th????ng - Thi??n s???
    const viTriThienLa = 5
    diaBan.nhapSao(viTriThienLa, saoThienLa)

    const viTriDiaVong = 11
    diaBan.nhapSao(viTriDiaVong, saoDiaVong)

    const viTriThienThuong = diaBan.cungNoboc
    diaBan.nhapSao(viTriThienThuong, saoThienThuong)

    const viTriThienSu = diaBan.cungTatAch
    diaBan.nhapSao(viTriThienSu, saoThienSu)

    // V??ng Thi??n m??
    const viTriThienMa = timThienMa(chiNam)
    diaBan.nhapSao(viTriThienMa, saoThienMa)

    const viTriHoaCai = dichCung(viTriThienMa, 2)
    diaBan.nhapSao(viTriHoaCai, saoHoaCai)

    const viTriKiepSat = dichCung(viTriThienMa, 3)
    diaBan.nhapSao(viTriKiepSat, saoKiepSat)

    const viTriDaoHoa = dichCung(viTriKiepSat, 4)
    diaBan.nhapSao(viTriDaoHoa, saoDaoHoa)

    // Ph?? to??i
    const viTriPhaToai = timPhaToai(chiNam)
    diaBan.nhapSao(viTriPhaToai, saoPhaToai)

    // ?????u qu??n
    const viTriDauQuan = dichCung(chiNam, -tt + gioSinh)
    diaBan.nhapSao(viTriDauQuan, saoDauQuan)

    //  T??? H??a
    // An theo 10 c??u c???a c??? Thi??n L????ng trong cu???n
    // S??? t??? vi d?????i m???t khoa h???c

    let viTriHoaLoc;
    let viTriHoaQuyen;
    let viTriHoaKhoa;
    let viTriHoaKy;
    if (canNam == 1) {
        viTriHoaLoc = viTriLiemTrinh
        viTriHoaQuyen = viTriPhaQuan
        viTriHoaKhoa = viTriVuKhuc
        viTriHoaKy = vitriThaiDuong
    } else if (canNam == 2) {
        viTriHoaLoc = viTriThienCo
        viTriHoaQuyen = viTriThienLuong
        viTriHoaKhoa = viTriTuVi
        viTriHoaKy = viTriThaiAm
    } else if (canNam == 3) {
        viTriHoaLoc = viTriThienDong
        viTriHoaQuyen = viTriThienCo
        viTriHoaKhoa = viTriVanXuong
        viTriHoaKy = viTriLiemTrinh
    } else if (canNam == 4) {
        viTriHoaLoc = viTriThaiAm
        viTriHoaQuyen = viTriThienDong
        viTriHoaKhoa = viTriThienCo
        viTriHoaKy = viTriCuMon
    } else if (canNam == 5) {
        viTriHoaLoc = viTriThamLang
        viTriHoaQuyen = viTriThaiAm
        viTriHoaKhoa = viTriHuuBat
        viTriHoaKy = viTriThienCo
    } else if (canNam == 6) {
        viTriHoaLoc = viTriVuKhuc
        viTriHoaQuyen = viTriThamLang
        viTriHoaKhoa = viTriThienLuong
        viTriHoaKy = viTriVanKhuc
    } else if (canNam == 7) {
        viTriHoaLoc = vitriThaiDuong
        viTriHoaQuyen = viTriVuKhuc
        viTriHoaKhoa = viTriThienDong
        viTriHoaKy = viTriThaiAm
    } else if (canNam == 8) {
        viTriHoaLoc = viTriCuMon
        viTriHoaQuyen = vitriThaiDuong
        viTriHoaKhoa = viTriVanKhuc
        viTriHoaKy = viTriVanXuong
    } else if (canNam == 9) {
        viTriHoaLoc = viTriThienLuong
        viTriHoaQuyen = viTriTuVi
        viTriHoaKhoa = viTriThienPhu
        viTriHoaKy = viTriVuKhuc
    } else if (canNam == 10) {
        viTriHoaLoc = viTriPhaQuan
        viTriHoaQuyen = viTriCuMon
        viTriHoaKhoa = viTriThaiAm
        viTriHoaKy = viTriThamLang
    }

    diaBan.nhapSao(viTriHoaLoc, saoHoaLoc)
    diaBan.nhapSao(viTriHoaQuyen, saoHoaQuyen)
    diaBan.nhapSao(viTriHoaKhoa, saoHoaKhoa)
    diaBan.nhapSao(viTriHoaKy, saoHoaKy)

    //  An L??u H?? - Thi??n Tr??
    // S??ch c??? Thi??n L????ng kh??ng ????? c???p ?????n 2 sao n??y
    // Mong m???i ng?????i ki???m ch???ng
    const [viTriLuuHa, viTriThienTru] = timLuuTru(canNam)
    diaBan.nhapSao(viTriLuuHa, saoLuuHa)
    diaBan.nhapSao(viTriThienTru, saoThienTru)

    // An Tu???n, Tri???t
    const ketThucTuan = dichCung(chiNam, 10 - canNam)
    const viTriTuan1 = dichCung(ketThucTuan, 1)
    const viTriTuan2 = dichCung(viTriTuan1, 1)
    diaBan.nhapTuan(viTriTuan1, viTriTuan2)

    const [viTriTriet1, viTriTriet2] = timTriet(canNam)
    diaBan.nhapTriet(viTriTriet1, viTriTriet2)
    return (diaBan)
}
module.exports = lapDiaBan;