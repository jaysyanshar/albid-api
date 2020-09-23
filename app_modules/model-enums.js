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
        bayi: 'BAYI',
        neonatus: 'NEONATUS'
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


module.exports = { 
    rekamMedisEnums, 
    asesmenAwalSubjektifEnums,
    asesmenAwalObjektifEnums,
    antenatalCareEnums,
    kohortEnums
}