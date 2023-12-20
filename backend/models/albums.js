const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    artisteId: { type: String },
    title: { type: String, required: true },
    artiste: { type: String },
    note: { type: String, required: true },
    genre: { type: String, required: true },
    annee: { type: String, required: true },
    type: { type: String },
    format: { type: String, required: true },
    imageUrl: { type: String, required: true }
})

module.exports = mongoose.model('Album', albumSchema)