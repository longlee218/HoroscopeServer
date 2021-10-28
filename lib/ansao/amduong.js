const {
  convertSolar2Lunar,
  convertLunar2Solar,
  jdFromDate,
} = require("../calendarVN");
const {
  NotFoundException,
  ValidationException,
  Exception,
} = require("../../src/exceptions");
const modulo = require("../modulo");

const thienCan = [
  {
    id: 0,
    chuCaiDau: null,
    tenCan: null,
    nguHanh: null,
    nguHanhID: null,
    vitriDiaBan: null,
    amDuong: null,
  },
  {
    id: 1,
    chuCaiDau: "G",
    tenCan: "Giáp",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 3,
    amDuong: 1,
  },
  {
    id: 2,
    chuCaiDau: "A",
    tenCan: "Ất",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 4,
    amDuong: -1,
  },
  {
    id: 3,
    chuCaiDau: "B",
    tenCan: "Bính",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 4,
    chuCaiDau: "D",
    tenCan: "Đinh",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 5,
    chuCaiDau: "M",
    tenCan: "Mậu",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 6,
    chuCaiDau: "K",
    tenCan: "Kỷ",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 7,
    chuCaiDau: "C",
    tenCan: "Canh",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 9,
    amDuong: 1,
  },
  {
    id: 8,
    chuCaiDau: "T",
    tenCan: "Tân",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 10,
    amDuong: -1,
  },
  {
    id: 9,
    chuCaiDau: "N",
    tenCan: "Nhâm",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 12,
    amDuong: 1,
  },
  {
    id: 10,
    chuCaiDau: "Q",
    tenCan: "Quý",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 1,
    amDuong: -1,
  },
];

const diaChi = [
  {
    id: 0,
    tenChi: "Hem có",
    tenHanh: ":D",
    amDuong: 0,
  },
  {
    id: 1,
    tenChi: "Tý",
    tenHanh: "T",
    menhChu: "Tham lang",
    thanChu: "Linh tinh",
    amDuong: 1,
  },
  {
    id: 2,
    tenChi: "Sửu",
    tenHanh: "O",
    menhChu: "Cự môn",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 3,
    tenChi: "Dần",
    tenHanh: "M",
    menhChu: "Lộc tồn",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 4,
    tenChi: "Mão",
    tenHanh: "M",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 5,
    tenChi: "Thìn",
    tenHanh: "O",
    menhChu: "Liêm trinh",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 6,
    tenChi: "Tỵ",
    tenHanh: "H",
    menhChu: "Vũ khúc",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
  {
    id: 7,
    tenChi: "Ngọ",
    tenHanh: "H",
    menhChu: "Phá quân",
    thanChu: "Hỏa tinh",
    amDuong: 1,
  },
  {
    id: 8,
    tenChi: "Mùi",
    tenHanh: "O",
    menhChu: "Vũ khúc",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 9,
    tenChi: "Thân",
    tenHanh: "K",
    menhChu: "Liêm trinh",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 10,
    tenChi: "Dậu",
    tenHanh: "K",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 11,
    tenChi: "Tuất",
    tenHanh: "O",
    menhChu: "Lộc tồn",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 12,
    tenChi: "Hợi",
    tenHanh: "T",
    menhChu: "Cự môn",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
];

/**
 *
 * @param nn (int): ngày
 * @param tt (int): tháng
 * @param nnnn (int): năm
 * @param duongLich (bool, optional): True nếu là dương lịch, false âm lịch
 * @param timeZone (int, optional): +7 Vietnam
 * @returns A node
 * @exception ValidationException
 */
const ngayThangNam = (nn, tt, nnnn, duongLich = true, timeZone = 7) => {
  let thangNhuan = 0;
  if (nn > 0 && nn < 32 && tt < 13 && tt > 0) {
    if (duongLich) {
      [nn, tt, nnnn, thangNhuan] = convertSolar2Lunar(nn, tt, nnnn, timeZone);
    }
    return [nn, tt, nnnn, thangNhuan];
  } else {
    throw new ValidationException("Ngày, tháng, năm không chính xác.");
  }
};

/**
 * @param nn (int): ngày
 * @param tt (int): tháng
 * @param nnnn (int): năm
 * @param duongLich (bool, optional): True nếu là dương lịch, false âm lịch
 * @param timeZone (int, optional): +7 Vietnam
 * @param  thangNhuan (bool, optional): True nếu là tháng nhuận, false là không nhuận
 * @returns A node
 * @exception ValidationException
 */
const canChiNgay = (
  nn,
  tt,
  nnnn,
  duongLich = true,
  timeZone = 7,
  thangNhuan = false
) => {
  if (!duongLich) {
    [nn, tt, nnnn] = convertLunar2Solar(nn, tt, nnnn, thangNhuan, timeZone);
  }
  const jd = jdFromDate(nn, tt, nnnn);
  //   const canNgay = ((jd + 9) % 10) + 1;
  //   const chiNgay = ((jd + 1) % 12) + 1;
  const canNgay = modulo(jd + 9, 10) + 1;
  const chiNgay = modulo(jd + 1, 12) + 1;
  return [canNgay, chiNgay];
};

/**
 * @param canNgay (int): Can của ngày cần xem, 1: Giáp, 2: Ất, 3: Bính,...
 * @param gio (int): Chi của giờ, 1: Tý, 2: Sửu,...
 * @returns A node
 */
const canChiGio = (canNgay, gio) => {
  return false;
};

/**
 *
 * @param nn (int): ngày
 * @param tt (int): tháng
 * @param nnnn (int): năm
 * @param duongLich (bool, optional): True nếu là dương lịch, false âm lịch
 * @param timeZone (int, optional): +7 Vietnam
 * @returns A node
 */

const ngayThangNamCanChi = (nn, tt, nnnn, duongLich = true, timeZone = 7) => {
  if (duongLich) {
    [nn, tt, nnnn, thangNhuan] = ngayThangNam(nn, tt, nnnn, true, timeZone);
  }
  // Can của tháng
  //   const canThang = ((nnnn * 12 + tt + 3) % 10) + 1;
  const canThang = modulo(nnnn * 12 + tt + 3, 10) + 1;

  // Can chi của năm
  const canNamSinh = modulo(nnnn + 6, 10) + 1;
  const chiNam = modulo(nnnn + 8, 12) + 1;
  return [canThang, canNamSinh, chiNam];
};

/**
 * @param tenHanh (string): Tên Hành trong ngũ hành, Kim hoặc K, Moc hoặc M, Thuy hoặc T, Hoa hoặc H, Tho hoặc O
 * @returns A object
 * @exception ValidationException
 */
const nguHanh = (tenHanh) => {
  if (["Kim", "K"].includes(tenHanh)) {
    return {
      id: 1,
      tenHanh: "Kim",
      cuc: 4,
      tenCuc: "Kim tứ Cục",
      css: "hanhKim",
    };
  } else if (tenHanh == "Moc" || tenHanh == "M") {
    return {
      id: 2,
      tenHanh: "Mộc",
      cuc: 3,
      tenCuc: "Mộc tam Cục",
      css: "hanhMoc",
    };
  } else if (tenHanh == "Thuy" || tenHanh == "T") {
    return {
      id: 3,
      tenHanh: "Thủy",
      cuc: 2,
      tenCuc: "Thủy nhị Cục",
      css: "hanhThuy",
    };
  } else if (tenHanh == "Hoa" || tenHanh == "H") {
    return {
      id: 4,
      tenHanh: "Hỏa",
      cuc: 6,
      tenCuc: "Hỏa lục Cục",
      css: "hanhHoa",
    };
  } else if (tenHanh == "Tho" || tenHanh == "O") {
    return {
      id: 5,
      tenHanh: "Thổ",
      cuc: 5,
      tenCuc: "Thổ ngũ Cục",
      css: "hanhTho",
    };
  } else {
    throw new ValidationException(
      "Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T),Hỏa (H) hoặc Thổ (O)"
    );
  }
};

/**
 * @param hanh1 (TYPE): Description
 * @param hanh2 (TYPE): Description
 * @returns A Description
 */
const sinhKhac = (hanh1, hanh2) => {
  // const matranSinhKhac = [
  //     [null, null, null, null, null, null],
  //     [null, 0, -1, 1, math.complex(0, -1), math.complex(0, 1)],
  //     [null, math.complex(0, -1), 0, math.complex(0, 1), 1, -1],
  //     [null, math.complex(0, 1), 1, 0, 1, math.complex(0, -1)],
  //     [null, -1, math.complex(0, 1), math.complex(0, -1), 0, 1],
  //     [null, 1, math.complex(0, -1), -1, math.complex(0, 1), 0]
  // ]
  const matranSinhKhac = [
    [null, null, null, null, null, null],
    [null, 0, -1, 1, -2, 2],
    [null, -2, 0, 2, 1, -1],
    [null, 2, 1, 0, 1, -2],
    [null, -1, 2, -2, 0, 1],
    [null, 1, -2, -1, 2, 0],
  ];
  return matranSinhKhac[hanh1][hanh2];
};

/**
 * @description Sử dụng Ngũ Hành nạp âm để tính Hành của năm.
 * @param diaChi (integer): Số thứ tự của địa chi (Tý=1, Sửu=2,...)
 * @param thienCan (integer): Số thứ tự của thiên can (Giáp=1, Ất=2,...)
 * @param xuatBanMenh (boolean): True nếu xuất, False không xuất
 * @returns Trả về chữ viết tắt Hành của năm (K, T, H, O, M)
 * @exception Exception
 */
const nguHanhNapAm = (diaChi, thienCan, xuatBanMenh = false) => {
  const banMenh = {
    K1: "HẢI TRUNG KIM",
    T1: "GIÁNG HẠ THỦY",
    H1: "TÍCH LỊCH HỎA",
    O1: "BÍCH THƯỢNG THỔ",
    M1: "TANG ÐỐ MỘC",
    T2: "ÐẠI KHÊ THỦY",
    H2: "LƯ TRUNG HỎA",
    O2: "THÀNH ÐẦU THỔ",
    M2: "TÒNG BÁ MỘC",
    K2: "KIM BẠCH KIM",
    H3: "PHÚ ÐĂNG HỎA",
    O3: "SA TRUNG THỔ",
    M3: "ÐẠI LÂM MỘC",
    K3: "BẠCH LẠP KIM",
    T3: "TRƯỜNG LƯU THỦY",
    K4: "SA TRUNG KIM",
    T4: "THIÊN HÀ THỦY",
    H4: "THIÊN THƯỢNG HỎA",
    O4: "LỘ BÀN THỔ",
    M4: "DƯƠNG LIỄU MỘC",
    T5: "TRUYỀN TRUNG THỦY",
    H5: "SƠN HẠ HỎA",
    O5: "ÐẠI TRẠCH THỔ",
    M5: "THẠCH LỰU MỘC",
    K5: "KIẾM PHONG KIM",
    H6: "SƠN ÐẦU HỎA",
    O6: "ỐC THƯỢNG THỔ",
    M6: "BÌNH ÐỊA MỘC",
    K6: "XOA XUYẾN KIM",
    T6: "ÐẠI HẢI THỦY",
  };
  const matranNapAm = [
    [0, "G", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "N", "Q"],
    [1, "K1", false, "T1", false, "H1", false, "O1", false, "M1", false],
    [2, false, "K1", false, "T1", false, "H1", false, "O1", false, "M1"],
    [3, "T2", false, "H2", false, "O2", false, "M2", false, "K2", false],
    [4, false, "T2", false, "H2", false, "O2", false, "M2", false, "K2"],
    [5, "H3", false, "O3", false, "M3", false, "K3", false, "T3", false],
    [6, false, "H3", false, "O3", false, "M3", false, "K3", false, "T3"],
    [7, "K4", false, "T4", false, "H4", false, "O4", false, "M4", false],
    [8, false, "K4", false, "T4", false, "H4", false, "O4", false, "M4"],
    [9, "T5", false, "H5", false, "O5", false, "M5", false, "K5", false],
    [10, false, "T5", false, "H5", false, "O5", false, "M5", false, "K5"],
    [11, "H6", false, "O6", false, "M6", false, "K6", false, "T6", false],
    [12, false, "H6", false, "O6", false, "M6", false, "K6", false, "T6"],
  ];
  try {
    const nh = matranNapAm[diaChi][thienCan];
    if (["K", "M", "T", "H", "O"].includes(nh[0])) {
      if (xuatBanMenh) {
        return banMenh[nh];
      } else {
        return nh[0];
      }
    }
  } catch {
    throw new Exception("nguHanhNapAm function error");
  }
};

const dichCung = (cungBanDau, ...args) => {
  let cungSauKhiDich = parseInt(cungBanDau);
  args.forEach((soCungDich) => {
    cungSauKhiDich += parseInt(soCungDich);
  });
  if (modulo(cungSauKhiDich, 12) == 0) {
    return 12;
  }
  return modulo(cungSauKhiDich, 12);
};

const khoangCachCung = (cung1, cung2, chieu = 1) => {
  if (chieu == 1) {
    // Con trai, chiều dương
    return modulo(cung1 - cung2 + 12, 12);
  } else {
    return modulo(cung2 - cung1 + 12, 12);
  }
};

const timCuc = (viTriCungMenhTrenDiaBan, canNamSinh) => {
  //   let canThangGieng = (canNamSinh * 2 + 1) % 10;
  let canThangGieng = modulo(canNamSinh * 2 + 1, 10);

  // Cho nay dang loi
  let canThangMenh =
    // (((viTriCungMenhTrenDiaBan - 3) % 12) + canThangGieng) % 10;
    modulo(modulo(viTriCungMenhTrenDiaBan - 3, 12) + canThangGieng, 10);
  if (canThangMenh == 0) {
    canThangMenh = 10;
  }
  return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
};

/**
 * @description Tìm vị trí của sao Tử vi
 * @param cuc (TYPE): Description
 * @param ngaySinhAmLich (TYPE): Description
 * @returns  TYPE: Description
 * @exception Description
 */
const timTuVi = (cuc, ngaySinhAmLich) => {
  let cungDan = 3; //Vị trí cung Dần ban đầu là 3
  const cucBanDau = cuc;
  if (![2, 3, 4, 5, 6].includes(cuc)) {
    //Tránh trường hợp infinite loop
    throw new ValidationException("Số cục phải là 2, 3, 4, 5, 6");
  }
  while (cuc < ngaySinhAmLich) {
    cuc += cucBanDau;
    cungDan += 1; // Dịch vị trí cung Dần
  }
  let saiLech = cuc - ngaySinhAmLich;
  if (modulo(saiLech, 2) == 1) {
    saiLech = -saiLech; // Nếu sai lệch là chẵn thì tiến, lẻ thì lùi
  }
  return dichCung(cungDan, saiLech);
};

/**
 * @description Tìm vị trí của Tràng sinh
 * @note Theo thứ tự cục số vị trí Tràng sinh sẽ là Dần, Tỵ, Thân hoặc Hợi, Theo cụ Thiên Lương: Nam -> Thuận, Nữ -> Nghịch
 * @param cucSo (int): số cục (2, 3, 4, 5, 6)
 * @returns int: Vị trí sao Tràng sinh
 * @exception NotFoundException
 */
const timTrangSinh = (cucSo) => {
  if (cucSo == 6)
    // Hỏa lục cục
    return 3;
  // Tràng sinh ở Dần
  else if (cucSo == 4)
    // Kim tứ cục
    return 6;
  // Tràng sinh ở Tỵ
  else if (cucSo == 2 || cucSo == 5)
    // Thủy nhị cục, Thổ ngũ cục
    return 9;
  // Tràng sinh ở Thân
  else if (cucSo == 3)
    // Mộc tam cục
    return 12;
  // Tràng sinh ở Hợi
  else throw new NotFoundException("Không tìm được cung an sao Trường sinh");
};

const timHoaLinh = (chiNamSinh, gioSinh, gioiTinh, amDuongNamSinh) => {
  let khoiCungHoaTinh;
  let khoiCungLinhTinh;
  if ([3, 7, 11].includes(chiNamSinh)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNamSinh)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNamSinh)) {
    khoiCungHoaTinh = 11;
    khoiCungLinhTinh = 4;
  } else if ([12, 4, 8].includes(chiNamSinh)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Exception("Không thể khởi cung tìm Hỏa-Linh");
  }
  let viTriHoaTinh;
  let viTriLinhTinh;
  if (gioiTinh * amDuongNamSinh == -1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -1 * gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
  } else if (gioiTinh * amDuongNamSinh == 1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -1 * gioSinh);
  }
  return [viTriHoaTinh, viTriLinhTinh];
};

const timThienKhoi = (canNam) => {
  const khoiViet = [null, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  try {
    return khoiViet[canNam];
  } catch {
    throw new NotFoundException("Không tìm được vị trí Khôi-Việt");
  }
};

const timThienQuanThienPhuc = (canNam) => {
  // Giáp dương Nhâm khuyển Ất long nghi
  // Mậu thổ Canh chư Quý mã thượng
  // Kỳ nhân quý hiển khả tiên tri
  const thienQuan = [null, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];

  // Giáp ái kim kê Ất ái hầu
  // Đinh chư Bính thử Kỷ hổ đầu
  // Tân quý phùng xà phúc lộc nhiêu
  const thienPhuc = [null, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
  try {
    return [thienQuan[canNam], thienPhuc[canNam]];
  } catch {
    throw new NotFoundException("Không tìm được Quan-Phúc");
  }
};

const timCoThan = (chiNam) => {
  if ([12, 1, 2].includes(chiNam)) return 3;
  else if ([3, 4, 5].includes(chiNam)) return 6;
  else if ([6, 7, 8].includes(chiNam)) return 9;
  else return 12;
};

const timThienMa = (chiNam) => {
  const demNghich = modulo(chiNam, 4);
  if (demNghich == 1) return 3;
  else if (demNghich == 2) return 12;
  else if (demNghich == 3) return 9;
  else if (demNghich == 0) return 6;
  else throw new NotFoundException("Không tìm được Thiên mã");
};

const timPhaToai = (chiNam) => {
  const demNghich = modulo(chiNam, 3);
  if (demNghich == 0) return 6;
  else if (demNghich == 1) return 10;
  else if (demNghich == 2) return 2;
  else throw new NotFoundException("Không tìm được Phá toái");
};

const timTriet = (canNam) => {
  // Giáp Kỷ, Thân Dậu cung
  if ([1, 6].includes(canNam)) return [9, 10];
  // Ất Canh, Ngọ Mùi cung
  else if ([2, 7].includes(canNam)) return [7, 8];
  // Bính Tân, Thìn Tị cung
  else if ([3, 8].includes(canNam)) return [5, 6];
  // Đinh Nhâm, Dần Mão cung
  else if ([4, 9].includes(canNam)) return [3, 4];
  // Mậu Quý, Tý Sửu cung
  else if ([5, 10].includes(canNam)) return [1, 2];
  else throw new NotFoundException("Không tìm được Triệt");
};

const timLuuTru = (canNam) => {
  const maTranLuuHa = [null, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
  const maTranThienTru = [null, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
  try {
    return [maTranLuuHa[canNam], maTranThienTru[canNam]];
  } catch {
    throw new NotFoundException("Không tìm được Lưu - Trù");
  }
};

module.exports = {
  ngayThangNam,
  canChiNgay,
  ngayThangNamCanChi,
  nguHanh,
  sinhKhac,
  nguHanhNapAm,
  dichCung,
  khoangCachCung,
  timCuc,
  timTuVi,
  timTrangSinh,
  timHoaLinh,
  timThienKhoi,
  timThienQuanThienPhuc,
  timCoThan,
  timThienMa,
  timPhaToai,
  timTriet,
  timLuuTru,
  thienCan,
  diaChi,
};
