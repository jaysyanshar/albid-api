///////////////
// Rekam Medis
///////////////
const rekamMedisEnums = {
    hubungan: Object.freeze({
        suami: 'SUAMI',
        orangtua: 'ORANGTUA',
        keluarga: 'KELUARGA',
        teman: 'TEMAN',
        lainnya: 'LAINNYA'
    }),
    
    perujuk: Object.freeze({
        bidan: 'BIDAN',
        puskesmas: 'PUSKESMAS',
        dokter: 'DOKTER',
        rumahSakit: 'RUMAH SAKIT',
        datangSendiri: 'DATANG SENDIRI',
        lainnya: 'LAINNYA'
    }),
    
    pemeriksaan: Object.freeze({
        asesmenAwal: 'ASESMEN AWAL',
        anc: 'ANC',
        kohort: 'KOHORT',
        soap1: 'SOAP I',
        soap2: 'SOAP II',
        soap3: 'SOAP III',
        soap4: 'SOAP IV',
        partograf: 'PARTOGRAF',
        pnc: 'PNC',
        kartuBayi: 'KARTU BAYI',
        neonatus: 'NEONATUS',
        pemeriksaanBayi: 'PEMERIKSAAN BAYI',
        pelayananKesehatan: 'PELAYANAN KESEHATAN'
    }),
}

//////////////////
// ASESMEN AWAL
//////////////////
const asesmenAwalSubjektifEnums = {
    riwayatKontrasepsi: Object.freeze({
        tidakAda: 'TIDAK ADA',
        pil: 'PIL',
        suntik: 'SUNTIK',
        iud: 'IUD',
        implan: 'IMPLAN',
        lainnya: 'LAINNYA'
    }),

    riwayatGynecolog: Object.freeze({
        infertilitas: 'INFERTILITAS',
        infeksiVirus: 'INFEKSI VIRUS',
        pms: 'PMS',
        cervicitisAkut: 'CERVICITIS AKUT',
        cervicitisKronis: 'CERVICITIS KRONIS',
        tidakAda: 'TIDAK ADA'
    }),

    metodePersalinan: Object.freeze({
        normal: 'NORMAL',
        operasiCaesar: 'OPERASI CAESAR',
        dibantuAlat: 'DIBANTU ALAT',
        lainnya: 'LAINNYA'
    }),

    penolongPersalinan: Object.freeze({
        bidan: 'BIDAN',
        dokter: 'DOKTER',
        paraji: 'PARAJI',
        lainnya: 'LAINNYA'
    }),

    jenisKelamin: Object.freeze({
        lakiLaki: 'LAKI-LAKI',
        perempuan: 'PEREMPUAN'
    }),

    provokatif: Object.freeze({
        benturan: 'BENTURAN',
        spontan: 'SPONTAN',
        lainnya: 'LAINNYA'
    }),

    quality: Object.freeze({
        sepertiTertusuk: 'SEPERTI TERTUSUK',
        berdenyutTerbakarTeriris: 'BERDENYUT TERBAKAR TERIRIS',
        lainnya: 'LAINNYA'
    }),

    severity: Object.freeze({
        nfs: 'NFS',
        flaccs: 'FLACCS',
        wongBaker: 'WONG BAKER',
        lainnya: 'LAINNYA'
    }),

    peredaNyeri: Object.freeze({
        minum: 'MINUM',
        obat: 'OBAT',
        istirahat: 'ISTIRAHAT',
        berubahPosisi: 'BERUBAH POSISI',
        mendengarkanMusik: 'MENDENGARKAN MUSIK',
        lainnya: 'LAINNYA'
    }),

    subjekEdukasi: Object.freeze({
        pasien: 'PASIEN',
        keluargaPasien: 'KELUARGA PASIEN',
        temanPasien: 'TEMAN PASIEN',
        lainnya: 'LAINNYA'
    }),

    materiEdukasi: Object.freeze({
        diagnosaPenyakit: 'DIAGNOSA PENYAKIT',
        hasilPemeriksaanPenunjang: 'HASIL PEMERIKSAAN PENUNJANG',
        terapiPengobatan: 'TERAPI PENGOBATAN',
        rencanaTindakan: 'RENCANA TINDAKAN',
        pemberianVaksin: 'PEMBERIAN VAKSIN',
        lainnya: 'LAINNYA'
    })
}

// ASESMEN AWAL OBJEKTIF
const asesmenAwalObjektifEnums = Object.freeze({
    keadaanUmum: {
        tampakTidakSakit: 'TAMPAK TIDAK SAKIT',
        sakitRingan: 'SAKIT RINGAN',
        sakitSedang: 'SAKIT SEDANG',
        sakitBerat: 'SAKIT BERAT',
    },

    kesadaran: {
        composMentis: 'COMPOS MENTIS',
        apatis: 'APATIS',
        somnolen: 'SOMNOLEN',
        sopor: 'SOPOR',
        coma: 'COMA',
    },

    reflex: {
        normal: 'NORMAL',
        hipo: 'HIPO',
        hyper: 'HYPER',
    },

    keputihan: {
        bening: 'BENING',
        kuning: 'KUNING',
        hijau: 'HIJAU'
    },

    lochea: {
        rubra: 'RUBRA',
        sanguinolenta: 'SANGUINOLENTA',
        serosa: 'SEROSA',
        alba: 'ALBA',
        purulenta: 'PURULENTA',
    },

    
})

//////////////////
// ANTENATAL CARE
//////////////////
const antenatalCareEnums = Object.freeze({
    trimester: {
        t1: '1',
        t2: '2',
        t3: '3'
    },
    statusGizi: {
        kurang: 'KURANG',
        normal: 'NORMAL',
        lebih: 'LEBIH'
    },
    posisiJanin: {
        kepala: 'KEPALA',
        sungsang: 'SUNGSANG',
        lintang: 'LINTANG'
    },
    imunisasiTetanus: {
        tt0: 'TT0',
        tt1: 'TT1',
        tt2: 'TT2',
        tt3: 'TT3',
        tt4: 'TT4',
        tt5: 'TT5'
    }
})

//////////
// KOHORT
//////////
const kohortEnums = Object.freeze({
    penolongPersalinan: {
        tenagaKesehatan: 'TENAGA KESEHATAN',
        dukunTerlatih: 'DUKUN TERLATIH',
        dukunTidakTerlatih: 'DUKUN TIDAK TERLATIH',
    }
})

///////////////
// SOAP ENUMS
///////////////
const soapEnums = Object.freeze({
    vesicaUrinaria: {
        penuh: 'PENUH',
        ada: 'ADA',
        kosong: 'KOSONG'
    },
    jenisKelamin: {
        lakiLaki: 'LAKI-LAKI',
        perempuan: 'PEREMPUAN'
    },
    palpasiAbdomen: {
        adaJaninLain: 'ADA JANIN LAIN',
        tidak: 'TIDAK'
    },
    kontraksiUterus: {
        ada: 'ADA',
        tidakDanLemah: 'TIDAK DAN LEMAH',
        adaKuat: 'ADA KUAT'
    },
    keteranganPlasenta: {
        spontan: 'SPONTAN',
        manual: 'MANUAL',
        lengkap: 'LENGKAP',
        tidak: 'TIDAK'
    },
    bilaRupture: {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV'
    }
})

//////////////
// PARTOGRAF
//////////////
const partografEnums = Object.freeze({
    pendampingPersalinan: {
        suami: 'SUAMI',
        keluarga: 'KELUARGA',
        teman: 'TEMAN',
        dukun: 'DUKUN',
        tidakAda: 'TIDAK ADA'
    },
    laserasiParineum: {
        1: '1',
        2: '2',
        3: '3',
        4: '4'
    },
    kontraksiUterus: soapEnums.kontraksiUterus,
    vesicaUrinaria: soapEnums.vesicaUrinaria,
    jenisKelamin: soapEnums.jenisKelamin,
    penilaianBayi: {
        baik: 'BAIK',
        adaPenyulit: 'ADA PENYULIT'
    },
    bayiNormal: {
        mengeringkan: 'MENGERINGKAN',
        menghangatkan: 'MENGHANGATKAN',
        memastikanIMD: 'MEMASTIKAN IMD',
        tindakanPencegahanInfeksi: 'TINDAKAN PENCEGAHAN INFEKSI'
    },
    kondisiBayi: {
        asfiksia: 'ASFIKSIA',
        pucat: 'PUCAT',
        biru: 'BIRU',
        lemas: 'LEMAS'
    },
    tindakanBayiTidakNormal: {
        mengeringkan: 'MENGERINGKAN',
        rangsangTaktil: 'RANGSANG TAKTIL',
        bebaskanNapas: 'BEBASKAN JALAN NAPAS',
        menghangatkan: 'MENGHANGATKAN',
        lainnya: 'LAINNYA'
    }
})

///////////////////
// POSTNATAL CARE
///////////////////
const postnatalCareEnums = Object.freeze({
    kondisiIbu: {
        baik: 'BAIK',
        kurangBaik: 'KURANG BAIK',
        tidakBaik: 'TIDAK BAIK'
    },
    kondisiPerineum: {
        baik: 'BAIK',
        adaJahitan: 'ADA JAHITAN',
        lainnya: 'LAINNYA'
    },
    tinggiFundusUteri: {
        duaJari: '2 JARI',
        tigaJari: '3 JARI',
        lainnya: 'LAINNYA'
    },
    lokhia: {
        rubra: 'RUBRA',
        lainnya: 'LAINNYA'
    }
})

//////////////////
// KARTU BAYI
//////////////////
const kartuBayiEnums = Object.freeze({
    jenisKelamin: asesmenAwalSubjektifEnums.jenisKelamin,
    golonganDarah: {
        a: 'A',
        b: 'B',
        ab: 'AB',
        o: 'O'
    },
    rhesus: {
        positif: '+',
        negatif: '-'
    },
    keadaanLahir: {
        hidup: 'HIDUP',
        mati: 'MATI'
    },
    keadaanPulang: {
        hidup: 'HIDUP',
        mati: 'MATI',
        dirujuk: 'DIRUJUK'
    },
    tempatDirujuk: {
        puskesmas: 'PUSKESMAS',
        rumahBersalin: 'RUMAH BERSALIN',
        rsia: 'RSIA',
        rsb: 'RSB',
        rumahSakit: 'RUMAH SAKIT',
        lainnya: 'LAINNYA'
    },
    keadaanTibaDirujuk: {
        hidup: 'HIDUP',
        mati: 'MATI'
    },
    keadaanPulangDirujuk: {
        hidup: 'HIDUP',
        mati: 'MATI'
    },
    komplikasi: {
        asfiksia: 'ASFIKSIA',
        hipotermi: 'HIPOTERMI',
        infeksi: 'INFEKSI',
        tetanus: 'TETANUS',
        bblr: 'BBLR',
        lainnya: 'LAINNYA'
    },
    imd: {
        lebih: 'LEBIH DARI 1 JAM',
        kurang: 'KURANG DARI 1 JAM'
    },
    pencegahan: {
        vitaminK1: 'VITAMIN K1',
        hepatitisB0: 'HEPATITIS B0',
        salepMata: 'SALEP MATA'
    }
})

module.exports = { 
    rekamMedisEnums, 
    asesmenAwalSubjektifEnums,
    asesmenAwalObjektifEnums,
    antenatalCareEnums,
    kohortEnums,
    soapEnums,
    partografEnums,
    postnatalCareEnums,
    kartuBayiEnums
}