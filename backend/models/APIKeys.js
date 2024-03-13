const mongoose = require('mongoose')

const APIKeyschema = mongoose.Schema({
    TMDB: { type: String },
    TVDB: { type: String },
    OMDB: { type: String },
    Trakt: { type: String },
})

module.exports = mongoose.model('API', APIKeyschema)