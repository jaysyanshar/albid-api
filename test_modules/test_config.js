const path = require('../config/path')
const credentials = require('../config/credentials')

const host = path.apiLocalHost + path.apiPath.root
const api = path.apiPath

module.exports = {
    uri: {
        session: host + api.session,
        bidan: host + api.bidan,
        pasien: host + api.pasien,
        rekamMedis: host + api.rekamMedis,
        asesmenAwal: host + api.asesmenAwal,
        asesmenAwalSubjektif: host + api.asesmenAwal + api.subjektif,
        asesmenAwalObjektif: host + api.asesmenAwal + api.objektif,
        anc: host + api.anc,
        kohort: host + api.kohort,
        soap1: host + api.soap1,
        soap2: host + api.soap2,
        soap3: host + api.soap3,
        soap4: host + api.soap4,
        partograf: host + api.partograf,
        pnc: host + api.pnc,
        kartuBayi: host + api.kartuBayi,
        neonatus: host + api.neonatus,
        pemeriksaanBayi: host + api.pemeriksaanBayi,
        pelayananKesehatan: host + api.pelayananKesehatan
    },
    headers: (sesID='') => {
        return {
            'X-API-Key': credentials.apiKey,
            'Session-ID': sesID
        }
    }
}