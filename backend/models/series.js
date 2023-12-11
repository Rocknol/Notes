const mongoose = require('mongoose');

const serieSchema = mongoose.Schema({
    title: { type: String, required: true },
    genres: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    fanartUrl: [{ type: String }],
    logo: { type: String },
    note: { type: String },
    decimale: { type: String },
    nombreSaisons: { type: Number },
    nombreEpisodes: { type: Number }
})

module.exports = mongoose.model('Serie', serieSchema)