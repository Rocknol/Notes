const mongoose = require("mongoose")

const realisateurSchema = mongoose.Schema({
    name: { type: String, required: true },
    nationalite: { type: String, required: true },
    lieuDeNaissance: { type: String },
    biographie: { type: String },
    birthday: { type: String },
    deathday: { type: String },
    note: { type: String },
    decimale: { type: String },
    imageUrl: { type: String, required: true },
    nombreFilms: { type: String }
})

module.exports = mongoose.model('Realisateur', realisateurSchema)