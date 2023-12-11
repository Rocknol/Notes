const mongoose = require('mongoose');

const sagaSchema = mongoose.Schema({
    title: { type: String, required: true },
    films: [{ type: String }],
    imageUrl: { type: String, required: true },
    note: { type: String },
    decimale: { type: String }
})

module.exports = mongoose.model('Saga', sagaSchema)