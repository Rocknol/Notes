const mongoose = require('mongoose');

const serieSchema = mongoose.Schema({
    title: { type: String, required: true },
    genres: [{ type: String, required: true }],
    imageUrl: [{ type: String, required: true }],
    fanartUrl: [{ type: String }],
    logo: { type: String },
    note: { type: String },
    decimale: { type: String },
    // lienTVDB: { type: String }
    plot: { type: String },
    firstAirDate: { type: String, required: true },
    lastAirDate: { type: String, required: true },
    status: { type: String, required: true },
    noteTMDB: { type: String },
    nombreVotesTMDB: { type: String },
    TMDBId: { type: String, required: true },
    TVDBId: { type: String },
    awards: { type: String },
    noteIMDB: { type: String },
    nombreVotesIMDB: { type: String }
})

module.exports = mongoose.model('Serie', serieSchema)