const mongoose = require('mongoose')

const saisonSchema = mongoose.Schema({

    title: { type: String, required: true },
    seasonNumber: { type: String, required: true },
    plot: { type: String },
    serieTitle: { type: String, required: true },
    imageUrl: { type: String, required: true },
    serieId: { type: String, required: true },
    note: { type: String },
    decimale: { type: String },
    noteTMDB: { type: String },
    airDate: { type: String },
    TMDBId: { type: String }
})

module.exports = mongoose.model('Saison', saisonSchema)