const mongoose = require('mongoose')

const { asesmenAwalObjektifEnums } = require('../app_modules/model-enums')

const Schema = mongoose.Schema

const asesmenAwalObjektifSchema = new Schema({
    keadaanUmum: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(asesmenAwalObjektifEnums.keadaanUmum),
    },
    kesadaran: {
        type: String,
        trim: true,
        uppercase: true,
        enum: Object.values(asesmenAwalObjektifEnums.kesadaran),
    },
    tandaVital: {
        tekananDarah: {
            sistolik: { type: Number, min: 0 },
            diastolik: { type: Number, min: 0 },
        },
        nadiPerMenit: { type: Number, min: 0 },
        napasPerMenit: { type: Number, min: 0 },
        suhuTubuh: Number, // dalam celsius
    },
    pemeriksaanFisik: {
        muka: {
            cloasmaGravidarum: Boolean, // ada/tidak
        },
        mata: {
            anemisKonjungtiva: Boolean, // ya/tidak
        },
        leher: {
            pembesaranKelenjarTiroid: { type: String, trim: true },
            peningkatanVenaJugularis: { type: String, trim: true },
            pembesaranKgb: { type: String, trim: true },
        },
        dada: {
            payudaraSimetris: Boolean, // ya/tidak
            putingSusuMenonjol: Boolean, // ya/tidak
            kolostrum: Boolean, // ada/tidak
            benjolan: { type: String, trim: true },
        },
        ekstremitasAtasBawah: {
            oedem: Boolean, // ada/tidak
            kekuatanOtotSendiNormal: Boolean, // ya/tidak
            varices: Boolean, // ada/tidak
            reflex: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalObjektifEnums.reflex),
            },
        },
        abdomen: {
            striaeGravidarum: Boolean, // ada/tidak
        },
        bekasLukaOperasi: Boolean, // ada/tidak
        tinggiFundusUteri: { type: Number, min: 0 }, // in cm
        palpasi: {
            leopold1: { type: String, trim: true },
            leopold2: { type: String, trim: true },
            leopold3: { type: String, trim: true },
            leopold4: { type: String, trim: true },
            his: {
                jumlahPerSepuluhMenit: { type: Number, min: 0 },
                intensitasKuat: Boolean, // ya/tidak
                durasi: { type: Number, min: 0 }, // dalam detik
            }
        },
        auskultasi: {
            denyutJantungJanin: {
                jumlah: { type: Number, min: 0, validate: { validator: Number.isInteger } },
                reguler: Boolean // ya/tidak
            },
            taksiranBeratJanin: { type: Number, min: 0 }, // gram
        },
        gynecolog: {
            pengeluaranPervaginam: {
                keputihan: {
                    type: String,
                    trim: true,
                    uppercase: true,
                    enum: Object.values(asesmenAwalObjektifEnums.keputihan),
                },
                bau: Boolean, // ya/tidak
                darah: Boolean, //ada/tidak
            },
            pembengkakanKelenjarBartholini: Boolean, // ya/tidak
            inspekulo: { type: String, trim: true },
        },
        nifas: {
            tinggiFundusUteri: { type: Number, min: 0 }, // in cm
            kontraksiUterusBaik: Boolean, // ya/tidak
            lochea: {
                type: String,
                trim: true,
                uppercase: true,
                enum: Object.values(asesmenAwalObjektifEnums.lochea)
            },
            lukaPerineum: { type: String, trim: true },
        },
        pemeriksaanDalam: {
            vulvaVagina: { type: String, trim: true },
            portio: { type: String, trim: true },
            ketuban: { type: String, trim: true },
            pembukaan: { type: String, trim: true },
            persentaseFetus: { type: String, trim: true },
            hodgeStation: { type: String, trim: true },
        },
        pemeriksaanPenunjang: {
            darahHb: { type: Number, min: 0 },
            ht: { type: Number, min: 0 },
            proteinUrinePositif: Boolean, // ya/tidak
            glukosa: { type: Number, min: 0 },
            usg: {
                deskripsi: { type: String, trim: true },
                idLampiran: [mongoose.Types.ObjectId],
            },
            ctg: {
                deskripsi: { type: String, trim: true },
                idLampiran: [mongoose.Types.ObjectId]
            },
            lainnya: { type: String, trim: true }
        }
    }
},
// { collection: 'asesmenAwalObjektif' }
)

module.exports = mongoose.model('AsesmenAwalObjektif', asesmenAwalObjektifSchema)