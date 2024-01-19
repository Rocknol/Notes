const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
    realisateurId: { type: String, required: true },
    title: { type: String, required: true },
    realisateur: { type: String, required: true },
    saga: { type: String },
    note: { type: String, required: true },
    genres: [{ type: String, required: true }],
    annee: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fanartUrl: [{ type: String }],
    logo: { type: String }
})

module.exports = mongoose.model('Film', filmSchema);