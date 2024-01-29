const mongoose = require('mongoose')

const episodeSchema = mongoose.Schema({
    numero: { type: String, required: true },
    title: { type: String, required: true },
    saisonId: { type: String, required: true },
    serieId: { type: String, required: true },
    note: { type: String, required: true },
    imageUrl: { type: String, required: true }
})

module.exports = mongoose.model('Episode', episodeSchema)