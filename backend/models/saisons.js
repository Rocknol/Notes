const mongoose = require('mongoose')

const saisonSchema = mongoose.Schema({

    title: { type: String, required: true },
    serieTitle: { type: String, required: true },
    imageUrl: { type: String, required: true },
    serieId: { type: String, required: true },
    note: { type: String },
    decimale: { type: String },
    nombreEpisodes: { type: Number }
})

module.exports = mongoose.model('Saison', saisonSchema)