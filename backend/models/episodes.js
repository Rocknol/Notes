const mongoose = require('mongoose')

const episodeSchema = mongoose.Schema({
    numero: { type: String, required: true },
    title: { type: String, required: true },
    saisonId: { type: String, required: true },
    serieId: { type: String, required: true },
    note: { type: String, required: true },
    imageUrl: { type: String, required: true },
    plot: { type: String },
    airDate: { type: String },
    runtime: { type: String },
    noteTMDB: { type: String },
    nombreVotesTMDB: { type: String },
    director: { type: String },
    noteIMDB: { type: String },
    nombreVotesIMDB: { type: String }
})

module.exports = mongoose.model('Episode', episodeSchema)