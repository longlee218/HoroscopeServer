const fs = require("fs");
const cheerio = require("cheerio");
const {toVNJoin} = require("../../../lib/translateToVN");
const CoreRepo = require("../../respositories/TrainingResults/CoreRepo");
const path_folder =
    "C:\\Users\\longl\\OneDrive\\Máy tính\\AKB_Calendar\\AKB_KHHB\\06.Users\\Long\\storage\\NamSinh\\";

const parserData = (file_path, file_name) => {
    const data = JSON.parse(fs.readFileSync(file_path).toString());
    const $ = cheerio.load(data["html-laso"]);
    const slug = file_name.split(".json")[0].split("_");

    // ngay_thang_nam_gio_gioitinh
    const obj = {
        id: `${slug[9]}_${slug[11]}_${slug[4]}_${slug[5]}_${slug[7]}_${slug[0]}_${slug[1]}`,
        alias_tp_gd: slug[0] + "_" + slug[1],
        alias_yy: slug[4] + "_" + slug[5],
        alias_hh: slug[7],
        alias_dd: slug[9],
        alias_mm: slug[11],
        create_at: Date.now(),
        title: data["tieu-de"],
        description: data["mo-ta"],
        explain: parserExplain(data["giai-thich"]),
        horoscope: {
            destiny: {},
            info: {},
        },
    };
    $("td").each(function (i, el) {
        const td = $(this);
        if (td.html() !== null) {
            if (td.attr("class") === "cung") {
                const top = $(td).find(".cung-top");
                const mid = $(td).find(".cung-middle");
                const bottom = $(td).find(".cung-bottom");

                // Top
                const arr_chinh_tinh = [];
                const vi_tri = $(top)
                    .find("span.cung-diachi")
                    .text()
                    .toLowerCase()
                    .trim();
                const dai_van = $(top)
                    .find("span.cung-daivan")
                    .text()
                    .toLowerCase()
                    .trim();
                const ten_cung_pre = $(top)
                    .find("p.cung-tencung")
                    .text()
                    .toLowerCase()
                    .trim();
                const ten_cung = ten_cung_pre.replace(" thân", "").trim();
                $(top)
                    .find(".chinh-tinh > p.text-center > span")
                    .each(function (i, value) {
                        const text = $(this).text().trim().toLowerCase();
                        const arr = text.match(/[(vmbđh)]{3}$/gm);
                        const name = text.replace(/[(vmbđh)]{3}$/gm, "");
                        if (text !== "") {
                            arr_chinh_tinh.push({
                                name: name.trim(),
                                slug: toVNJoin(name),
                                position: arr === null ? null : arr[0],
                                five_basic_el: $(this).attr("class"),
                            });
                        }
                    });

                // Middle
                const arr_sao_tot = [];
                const arr_sao_xau = [];
                $(mid)
                    .find(".sao-tot > li")
                    .each(function (i, value) {
                        const text = $(this).text().toLowerCase();
                        const arr = text.match(/[(vmbđh)]{3}$/gm);
                        const name = text.replace(/[(vmbđh)]{3}$/gm, "");
                        arr_sao_tot.push({
                            name: name.trim(),
                            slug: toVNJoin(name),
                            position: arr === null ? null : arr[0],
                            five_basic_el: $(this).find("span").attr("class"),
                        });
                    });
                $(mid)
                    .find(".sao-xau > li")
                    .map(function (i, value) {
                        const text = $(this).text().toLowerCase();
                        const arr = text.match(/[(vmbđh)]{3}$/gm);
                        const name = text.replace(/[(vmbđh)]{3}$/gm, "");
                        arr_sao_xau.push({
                            name: name.trim(),
                            slug: toVNJoin(name),
                            position: arr === null ? null : arr[0],
                            five_basic_el: $(this).find("span").attr("class"),
                        });
                    });

                // Bottom
                const tieu_han = $(bottom).find(".cung-tieuvan").text().toLowerCase();
                const nguyet_han = $(bottom).find(".cung-nguhanh");
                const trang_sinh = $(bottom).find(".text-center > span");

                obj.horoscope.destiny[`_${i}`] = {
                    name: ten_cung,
                    slug: "cung_" + toVNJoin(ten_cung),
                    has_main_star: arr_chinh_tinh.length !== 0,
                    is_body_horoscope: ten_cung_pre !== ten_cung,
                    position: vi_tri,
                    fortune: parseInt(dai_van),
                    main_star: arr_chinh_tinh,
                    good_star: arr_sao_tot,
                    bad_star: arr_sao_xau,
                    year_destiny: tieu_han,
                    circle_life: {
                        name: trang_sinh.text().toLowerCase(),
                        slug: toVNJoin(trang_sinh.text().toLowerCase()),
                        five_basic_el: trang_sinh.attr("class"),
                    },
                    month_destiny: {
                        name: nguyet_han.text().toLowerCase(),
                        slug: toVNJoin(nguyet_han.text().toLowerCase()),
                        five_basic_el: nguyet_han.attr("class").split(" ")[1],
                    },
                };
            } else {
                const thien_ban = $(this).find(".nhom-thienban > p");
                const obj_info = {};
                thien_ban.each(function (i, value) {
                    let text = $(this).text().toLowerCase();
                    let key = "";
                    let slug = "";
                    let replace_c = "";
                    const tp = $(this).find("span").attr("class");
                    const five_basic_el = tp ? tp : null;
                    switch (i) {
                        case 0:
                            key = "year";
                            replace_c = "năm: ";
                            break;
                        case 1:
                            key = "month";
                            replace_c = "tháng: ";
                            break;
                        case 2:
                            key = "day";
                            replace_c = "ngày: ";
                            break;
                        case 3:
                            key = "hour";
                            replace_c = "giờ: ";
                            break;
                        case 4:
                            key = "gender";
                            replace_c = "âm dương: ";
                            break;
                        case 5:
                            key = "fate";
                            replace_c = "mệnh: ";
                            break;
                        case 6:
                            key = "_cuc";
                            replace_c = "cục: ";
                            break;
                        case 7:
                            key = "_than_cu";
                            replace_c = "thân cư: ";
                            break;
                        case 8:
                            key = "_menh_chu";
                            replace_c = "mệnh chủ: ";
                            break;
                        case 9:
                            key = "_than_chu";
                            replace_c = "thân chủ: ";
                            break;
                        case 10:
                            key = "_diem_huyen_khi";
                            replace_c = "điểm huyền khí: ";
                            break;
                        case 11:
                            key = "_diem_cung_khi";
                            replace_c = "điểm cung khí: ";
                            break;
                        case 12:
                            key = "_lai_nhan_cung";
                            replace_c = "lai nhân cung: ";
                            break;
                        case 13:
                            key = "_nguyen_than";
                            replace_c = "nguyên thần: ";
                            text.replace("nguyên thần: ", "");
                            break;
                    }
                    text = text.replace(replace_c, "");
                    if (!isNaN(text)) {
                        text = parseFloat(text);
                        slug = null;
                    } else {
                        slug = toVNJoin(text);
                    }
                    obj_info[key] = {
                        name: text,
                        slug: slug,
                        five_basic_el: five_basic_el,
                    };
                });
                obj.horoscope.info = obj_info;
            }
        }
    });
    return obj;
};

const parserExplain = (rawData) => {
    for (let key in rawData) {
        const k = key.replace(/(:|-)/gm, "");
        if (k !== key) {
            rawData[k] = rawData[key];
            delete rawData[key];
        }
        const el = rawData[k];
        el.forEach((item) => {
            item["reason"] = item["nguyen-nhan"];
            item["result"] = item["ket-qua"];
            item["refer"] = item["tham-khao"];
            delete item["nguyen-nhan"];
            delete item["ket-qua"];
            delete item["tham-khao"];
        });
    }
    return rawData;
};

const readDirPromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (errD, files) => {
            if (errD) {
                reject();
            }
            resolve(files);
        });
    });
};

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (error, content) => {
            if (error) {
                reject(error);
            }
            resolve(content);
        });
    });
};

// const renameFile = () => {
//   readDirPromise(path_folder)
//     .then((folders) => {
//       folders.forEach((folder) => {
//         const path_folder_child = path_folder + folder;
//         readDirPromise(path_folder_child)
//           .then((files) => {
//             files.forEach((fileName) => {
//               const path_file = path_folder_child + "/" + fileName;
//               const strContent = fs.readFileSync(path_file).toString();
//               const jsonContent = JSON.parse(strContent);
//               const title = jsonContent["tieu-de"].toLowerCase();
//               const isMatchYear = title.match(
//                 /năm (canh|tân|nhâm|quý|giáp|ất|bính|đinh|mậu|kỷ) tí/i
//               );
//               const isMatchHour = title.match(/giờ tí/i);
//               const arrFileName = fileName.split("_");
//               let isChange = false;
//               if (isMatchYear) {
//                 arrFileName[5] = "ty";
//                 isChange = true;
//               }
//               if (isMatchHour) {
//                 arrFileName[7] = "ty";
//                 isChange = true;
//               }
//               if (isChange) {
//                 const newFileName = arrFileName.join("_");
//                 fs.rename(
//                   path_folder_child + "/" + fileName,
//                   path_folder_child + "/" + newFileName,
//                   (error) => {
//                     if (error) {
//                       console.log("Error: " + fileName);
//                     } else {
//                       console.log("Success" + newFileName);
//                     }
//                   }
//                 );
//               }
//             });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
const timer = ms => new Promise(res => setTimeout(res, ms))

const seeds = async () => {
    readDirPromise(path_folder).then((folders) => {
        const folder = folders[7];
        const path_folder_child = path_folder + folder;
        readDirPromise(path_folder_child).then(async (files) => {
            for (let i = 0; i < files.length; i++) {
                const fileName = files[i];
                const path_file = path_folder_child + "/" + fileName;
                const data = parserData(path_file, fileName);
                CoreRepo.create(data).then(result => {
                    console.log(result === null ? "Skip: " + i : "Success: " + i + "-" + result.id);
                });
                await timer(3000); // then the created Promise can be awaited
            }
            console.log("Finish");
        });
    });
};

seeds().then(r => console.log("Start"));
