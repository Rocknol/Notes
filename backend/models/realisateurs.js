const mongoose = require("mongoose")

const realisateurSchema = mongoose.Schema({
    name: { type: String, required: true },
    nationalite: { type: String, required: true },
    lieuDeNaissance: { type: String, required: true },
    biographie: { type: String, required: true },
    birthday: { type: String, required: true },
    deathday: { type: String },
    note: { type: String },
    decimale: { type: String },
    imageUrl: { type: String, required: true },
    nombreFilms: { type: String }
})

module.exports = mongoose.model('Realisateur', realisateurSchema)