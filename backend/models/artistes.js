const mongoose = require('mongoose');

const artisteSchema = mongoose.Schema({
    name: { type: String, required: true },
    nationalite: { type: String, required: true },
    note: { type: String },
    decimale: { type: String },
    imageUrl: { type: String, required: true },
    nombreAlbums: { type: String }
})

module.exports = mongoose.model('Artiste', artisteSchema)