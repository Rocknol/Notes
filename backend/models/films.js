const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
    realisateurId: { type: String, required: true },
    title: { type: String, required: true },
    plot: { type: String, required: true },
    realisateur: { type: String, required: true },
    saga: { type: String },
    note: { type: String, required: true },
    genres: [{ type: String, required: true }],
    releaseDate: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fanartUrl: [{ type: String }],
    logo: { type: String },
    runtime: { type: String, required: true },
    awards: { type: String },
    noteTMDB: { type: String },
    nombreVotesTMDB: { type: String },
    metascore: { type: String },
    noteIMDB: { type: String },
    nombreVotesIMDB: { type: String }

})

module.exports = mongoose.model('Film', filmSchema);