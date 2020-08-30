const path = require('../config/path')
const { rekamMedisEnums } = require('../app_modules/model-enums')

const apiKey = require('../config/credentials').apiKey
const host = path.apiLocalHost + path.apiPath.root
const bidanUri = host + path.apiPath.bidan
const pasienUri = host + path.apiPath.pasien
const sessionUri = host + path.apiPath.session
const rekamMedisUri = host + path.apiPath.rekamMedis
const asesmenAwalUri = host + path.apiPath.asesmenAwal

var bidanOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

var bidanData = {
    nik: '3210000000000000',
    password: 'mytestpassword',
    nama: 'My Test Name',
    kontak: {
        noHP: '080000000000'
    }
}

var bidanLoginInfo = {
    noHP: bidanData.kontak.noHP,
    password: bidanData.password,
    isBidan: true,
}

var pasienOptions = {
    headers: {
        'X-API-Key': apiKey
    },
    json: true
}

var pasienData = {
    nik: '3210000000000001',
    nama: 'My Pasien Test Name',
    kontak: {
        noHP: '080000000001'
    }
}

var pasienLoginInfo = {
    noHP: pasienData.kontak.noHP,
    password: '',
    isBidan: false
}

var rekamMedisData = {
    penanggungJawab: {
        nama: 'Penanggung Jawab Pasien',
        noHP: '080000000002',
        hubungan: rekamMedisEnums.hubungan.keluarga,
    },
    perujuk: rekamMedisEnums.perujuk.bidan,
    jenisPemeriksaan: rekamMedisEnums.pemeriksaan.asesmenAwal,
}

var asesmenAwalData = {
    subjektif: {
        paritas: {
            gravida: 3,
            partus: 0,
            abortus: 2
        },
        anamnesis: "Pendarahan",
        riwayatPenyakit: {
            sekarang: [
                "Pendarahan sejak 1 minggu kemarin."
            ]
        },
        riwayatMenstruasi: {
            haidTerakhir: {
                hariPertama: "2019-08-09",
                hariTerakhir: "2019-08-19"
            },
            menorrhagia: true,
            metrorrhagia: true,
            jumlahGantiPembalut: 3,
            dismenorrhoe: false,
            siklus: 28,
            teratur: true
        },
        riwayatImunisasiTetanusLengkap: false,
        riwayatPerkawinan: {
            jumlahPerkawinan: 1,
            tahunPerkawinan: "2006-01-01",
            usiaLakiLaki: 32,
            usiaPerempuan: 19
        },
        riwayatKontrasepsi: [
            "PIL"
        ],
        riwayatObstetri: [
            {
                tanggalPersalinan: "2006-12-31"
            },
            {
                tanggalPersalinan: "2008-12-31"
            }
        ]
    },
    objektif: {
        keadaanUmum: "TAMPAK TIDAK SAKIT",
        kesadaran: "COMPOS MENTIS",
        tandaVital: {
            tekananDarah: {
                sistolik: 120,
                diastolik: 80
            },
            nadiPerMenit: 78,
            napasPerMenit: 20,
            suhuTubuh: 36.6
        },
        pemeriksaanFisik: {
            muka: {
                cloasmaGravidarum: false
            },
            mata: {
                konjungtivaAnemis: false
            },
            dada: {
                payudaraSimetris: true,
                putingSusuMenonjol: true,
                kolostrum: false,
                retraksi: false
            },
            ekstremitasAtasBawah: {
                oedem: false,
                kekuatanOtotSendiNormal: true,
                varices: false,
                reflex: "NORMAL"
            },
            abdomen: {
                striaeGravidarum: true
            },
            bekasLukaOperasi: true,
            tinggiFundusUteri: 28,
            palpasi: {
                leopold1: "bokong",
                leopold2: "puka",
                leopold3: "kepala",
                his: {
                    intensitasKuat: false
                }
            },
            auskultasi: {
                denyutJantungJanin: {
                    jumlah: 140
                }
            }
        }
    }
}

module.exports = {
    uri: {
        bidan: bidanUri,
        pasien: pasienUri,
        session: sessionUri,
        rekamMedis: rekamMedisUri,
        asesmenAwal: asesmenAwalUri,
        asesmenAwalSubjektif: `${asesmenAwalUri}/subjektif`,
        asesmenAwalObjektif: `${asesmenAwalUri}/objektif`
    },
    options: {
        bidan: bidanOptions,
        pasien: pasienOptions,
    },
    user: {
        bidan: bidanData,
        pasien: pasienData,
    },
    login: {
        bidan: bidanLoginInfo,
        pasien: pasienLoginInfo,
    },
    rekamMedis: rekamMedisData,
    asesmenAwal: asesmenAwalData
}