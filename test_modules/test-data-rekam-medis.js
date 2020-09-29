let rekamMedisA = {
    idBidan: '',
    idPasien: '',
    penanggungJawab: {
        nama: 'Penanggung Jawab',
        noHP: '081111111111',
        hubungan: 'SUAMI'
    },
    perujuk: 'BIDAN',
    jenisPemeriksaan: 'ASESMEN AWAL'
}

let rekamMedisB = {
    idBidan: '',
    idPasien: '',
    penanggungJawab: {
        nama: 'Penanggung Jawab',
        noHP: '081111111111',
        hubungan: 'SUAMI'
    },
    perujuk: 'BIDAN',
    jenisPemeriksaan: 'ANC'
}

let updateRekamMedis = {
    rekamMedisA: {
        penanggungJawab: { noHP: '081111111112' },
        perujuk: 'DOKTER'
    }
}

module.exports = { rekamMedisA, rekamMedisB, updateRekamMedis }